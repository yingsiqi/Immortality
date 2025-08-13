<template>
  <div class="minor-character-navigation">
    <!-- 搜索和筛选区域 -->
    <div class="search-filter-section">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索角色姓名、势力或境界..."
          class="search-input"
        />
        <button @click="clearSearch" class="clear-btn" v-if="searchQuery">×</button>
      </div>
      
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category.key"
          @click="activeCategory = category.key"
          :class="['filter-tab', { active: activeCategory === category.key }]"
        >
          {{ category.name }} ({{ category.count }})
        </button>
      </div>
      
      <div class="sub-filters" v-if="subFilters.length > 0">
        <button 
          v-for="filter in subFilters" 
          :key="filter.key"
          @click="activeSubFilter = filter.key"
          :class="['sub-filter', { active: activeSubFilter === filter.key }]"
        >
          {{ filter.name }} ({{ filter.count }})
        </button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-section">
      <div class="total-count">共 {{ filteredCharacters.length }} 个角色</div>
      <div class="view-options">
        <button 
          @click="viewMode = 'grid'"
          :class="['view-btn', { active: viewMode === 'grid' }]"
        >
          网格视图
        </button>
        <button 
          @click="viewMode = 'list'"
          :class="['view-btn', { active: viewMode === 'list' }]"
        >
          列表视图
        </button>
        <button 
          @click="viewMode = 'table'"
          :class="['view-btn', { active: viewMode === 'table' }]"
        >
          表格视图
        </button>
      </div>
    </div>

    <!-- 角色展示区域 -->
    <div class="characters-display">
      <!-- 网格视图 -->
      <div v-if="viewMode === 'grid'" class="grid-view">
        <div 
          v-for="character in paginatedCharacters" 
          :key="character.id"
          class="character-card"
        >
          <div class="character-name">{{ character.name }}</div>
          <div class="character-info">
            <span class="faction">{{ character.faction }}</span>
            <span class="realm">{{ character.realm }}</span>
          </div>
          <div class="character-description">{{ character.description }}</div>
        </div>
      </div>

      <!-- 列表视图 -->
      <div v-if="viewMode === 'list'" class="list-view">
        <div 
          v-for="character in paginatedCharacters" 
          :key="character.id"
          class="character-item"
        >
          <div class="character-header">
            <span class="character-name">{{ character.name }}</span>
            <span class="character-tags">
              <span class="tag faction-tag">{{ character.faction }}</span>
              <span class="tag realm-tag">{{ character.realm }}</span>
              <span class="tag status-tag">{{ character.status }}</span>
            </span>
          </div>
          <div class="character-description">{{ character.description }}</div>
        </div>
      </div>

      <!-- 表格视图 -->
      <div v-if="viewMode === 'table'" class="table-view">
        <table class="characters-table">
          <thead>
            <tr>
              <th @click="sortBy('name')" class="sortable">
                姓名 <span class="sort-indicator">{{ getSortIndicator('name') }}</span>
              </th>
              <th @click="sortBy('faction')" class="sortable">
                势力 <span class="sort-indicator">{{ getSortIndicator('faction') }}</span>
              </th>
              <th @click="sortBy('realm')" class="sortable">
                境界 <span class="sort-indicator">{{ getSortIndicator('realm') }}</span>
              </th>
              <th>状态</th>
              <th>主要事迹</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="character in paginatedCharacters" :key="character.id">
              <td class="character-name">{{ character.name }}</td>
              <td class="faction">{{ character.faction }}</td>
              <td class="realm">{{ character.realm }}</td>
              <td class="status">{{ character.status }}</td>
              <td class="description">{{ character.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页控件 -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        @click="currentPage = 1" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        首页
      </button>
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        上一页
      </button>
      
      <span class="page-info">
        第 {{ currentPage }} 页，共 {{ totalPages }} 页
      </span>
      
      <button 
        @click="currentPage++" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        下一页
      </button>
      <button 
        @click="currentPage = totalPages" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        末页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { characters, factionMap, realmMap, statusMap } from '../data/characters.js'

// 响应式数据
const searchQuery = ref('')
const activeCategory = ref('all')
const activeSubFilter = ref('all')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = ref(50)
const sortField = ref('name')
const sortOrder = ref('asc')

// 分类定义 - 使用计算属性动态获取数量
const categories = computed(() => {
  const totalCount = charactersData.value.length
  return [
    { key: 'all', name: '全部', count: totalCount },
    { key: 'faction', name: '按势力', count: totalCount },
    { key: 'realm', name: '按境界', count: totalCount },
    { key: 'status', name: '按状态', count: totalCount }
  ]
})

// 使用导入的角色数据
const charactersData = ref(characters)

// 子筛选器
const subFilters = computed(() => {
  const chars = charactersData.value
  const totalCount = chars.length
  
  switch (activeCategory.value) {
    case 'faction':
      const factionCounts = {}
      chars.forEach(char => {
        factionCounts[char.faction] = (factionCounts[char.faction] || 0) + 1
      })
      
      return [
        { key: 'all', name: '全部势力', count: totalCount },
        { key: '七玄门', name: '七玄门', count: factionCounts['七玄门'] || 0 },
        { key: '掩月宗', name: '掩月宗', count: factionCounts['掩月宗'] || 0 },
        { key: '黄枫谷', name: '黄枫谷', count: factionCounts['黄枫谷'] || 0 },
        { key: '韩家', name: '韩家', count: factionCounts['韩家'] || 0 },
        { key: '惊蛟会', name: '惊蛟会', count: factionCounts['惊蛟会'] || 0 },
        { key: '四平帮', name: '四平帮', count: factionCounts['四平帮'] || 0 },
        { key: '野狼帮', name: '野狼帮', count: factionCounts['野狼帮'] || 0 },
        { key: '散修', name: '散修', count: factionCounts['散修'] || 0 },
        { key: '天阙堡', name: '天阙堡', count: factionCounts['天阙堡'] || 0 },
        { key: '化刀坞', name: '化刀坞', count: factionCounts['化刀坞'] || 0 },
        { key: '巨剑门', name: '巨剑门', count: factionCounts['巨剑门'] || 0 },
        { key: '灵兽山', name: '灵兽山', count: factionCounts['灵兽山'] || 0 },
        { key: '千竹教', name: '千竹教', count: factionCounts['千竹教'] || 0 },
        { key: '天星宗', name: '天星宗', count: factionCounts['天星宗'] || 0 },
        { key: '其他', name: '其他', count: factionCounts['其他'] || 0 }
      ]
    case 'realm':
      const realmCounts = {}
      chars.forEach(char => {
        realmCounts[char.realm] = (realmCounts[char.realm] || 0) + 1
      })
      
      return [
        { key: 'all', name: '全部境界', count: totalCount },
        { key: '凡人', name: '凡人', count: realmCounts['凡人'] || 0 },
        { key: '炼气期', name: '炼气期', count: realmCounts['炼气期'] || 0 },
        { key: '筑基期', name: '筑基期', count: realmCounts['筑基期'] || 0 },
        { key: '结丹期', name: '结丹期', count: realmCounts['结丹期'] || 0 },
        { key: '元婴期', name: '元婴期', count: realmCounts['元婴期'] || 0 },
        { key: '化神期', name: '化神期', count: realmCounts['化神期'] || 0 },
        { key: '炼虚期', name: '炼虚期', count: realmCounts['炼虚期'] || 0 }
      ]
    case 'status':
      const statusCounts = {}
      chars.forEach(char => {
        statusCounts[char.status] = (statusCounts[char.status] || 0) + 1
      })
      
      return [
        { key: 'all', name: '全部状态', count: totalCount },
        { key: '存活', name: '存活', count: statusCounts['存活'] || 0 },
        { key: '死亡', name: '死亡', count: statusCounts['死亡'] || 0 },
        { key: '失踪', name: '失踪', count: statusCounts['失踪'] || 0 },
        { key: '未知', name: '未知', count: statusCounts['未知'] || 0 }
      ]
    default:
      return []
  }
})

// 筛选后的角色
const filteredCharacters = computed(() => {
  let result = charactersData.value
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(char => 
      char.name.toLowerCase().includes(query) ||
      char.faction.toLowerCase().includes(query) ||
      char.realm.toLowerCase().includes(query) ||
      char.description.toLowerCase().includes(query)
    )
  }
  
  // 分类筛选
  if (activeCategory.value !== 'all' && activeSubFilter.value !== 'all') {
    switch (activeCategory.value) {
      case 'faction':
        result = result.filter(char => char.faction === activeSubFilter.value)
        break
      case 'realm':
        result = result.filter(char => char.realm === activeSubFilter.value)
        break
      case 'status':
        result = result.filter(char => char.status === activeSubFilter.value)
        break
    }
  }
  
  // 排序
  result.sort((a, b) => {
    const aVal = a[sortField.value]
    const bVal = b[sortField.value]
    const order = sortOrder.value === 'asc' ? 1 : -1
    return aVal.localeCompare(bVal) * order
  })
  
  return result
})

// 分页后的角色
const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCharacters.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / pageSize.value)
})

// 方法
const clearSearch = () => {
  searchQuery.value = ''
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

const getSortIndicator = (field) => {
  if (sortField.value !== field) return ''
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

// 监听筛选变化，重置页码
watch([activeCategory, activeSubFilter, searchQuery], () => {
  currentPage.value = 1
})

// 监听分类变化，重置子筛选
watch(activeCategory, () => {
  activeSubFilter.value = 'all'
})
</script>

<style scoped>
.minor-character-navigation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 搜索和筛选区域 */
.search-filter-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #007acc;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.filter-tab:hover {
  border-color: #007acc;
}

.filter-tab.active {
  background: #007acc;
  color: white;
  border-color: #007acc;
}

.sub-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sub-filter {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
}

.sub-filter:hover {
  border-color: #007acc;
}

.sub-filter.active {
  background: #007acc;
  color: white;
  border-color: #007acc;
}

/* 统计信息 */
.stats-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f1f3f4;
  border-radius: 6px;
}

.total-count {
  font-weight: bold;
  color: #333;
}

.view-options {
  display: flex;
  gap: 5px;
}

.view-btn {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
}

.view-btn:hover {
  border-color: #007acc;
}

.view-btn.active {
  background: #007acc;
  color: white;
  border-color: #007acc;
}

/* 网格视图 */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.character-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s;
}

.character-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #007acc;
}

.character-card .character-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.character-card .character-info {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.character-card .faction {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.character-card .realm {
  background: #f3e5f5;
  color: #7b1fa2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.character-card .character-description {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

/* 列表视图 */
.list-view {
  margin-bottom: 20px;
}

.character-item {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.character-item:hover {
  border-color: #007acc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.character-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.character-item .character-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.character-tags {
  display: flex;
  gap: 6px;
}

.tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.faction-tag {
  background: #e3f2fd;
  color: #1976d2;
}

.realm-tag {
  background: #f3e5f5;
  color: #7b1fa2;
}

.status-tag {
  background: #e8f5e8;
  color: #2e7d32;
}

/* 表格视图 */
.table-view {
  margin-bottom: 20px;
  overflow-x: auto;
}

.characters-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.characters-table th {
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #e1e5e9;
}

.characters-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.characters-table th.sortable:hover {
  background: #e9ecef;
}

.sort-indicator {
  margin-left: 5px;
  color: #007acc;
}

.characters-table td {
  padding: 12px;
  border-bottom: 1px solid #e1e5e9;
}

.characters-table tr:hover {
  background: #f8f9fa;
}

.characters-table .character-name {
  font-weight: bold;
  color: #333;
}

.characters-table .faction {
  color: #1976d2;
}

.characters-table .realm {
  color: #7b1fa2;
}

.characters-table .status {
  color: #2e7d32;
}

.characters-table .description {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  border-color: #007acc;
  background: #f0f8ff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  padding: 8px 16px;
  color: #666;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .minor-character-navigation {
    padding: 10px;
  }
  
  .grid-view {
    grid-template-columns: 1fr;
  }
  
  .stats-section {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  
  .character-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .filter-tabs,
  .sub-filters {
    justify-content: center;
  }
}
</style>