document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const docStatusBadge = document.getElementById('doc-status');
  const startDocBtn = document.getElementById('start-doc');
  const stopDocBtn = document.getElementById('stop-doc');
  const openDocBtn = document.getElementById('open-doc');
  const startAllBtn = document.getElementById('start-all');
  const stopAllBtn = document.getElementById('stop-all');

  // 初始化 - 获取所有服务状态
  fetchServicesStatus();

  // 设置定时刷新状态（每5秒）
  setInterval(fetchServicesStatus, 5000);

  // 事件监听器
  startDocBtn.addEventListener('click', () => startService('doc'));
  stopDocBtn.addEventListener('click', () => stopService('doc'));
  startAllBtn.addEventListener('click', startAllServices);
  stopAllBtn.addEventListener('click', stopAllServices);

  // 获取所有服务状态
  function fetchServicesStatus() {
    fetch('/api/services')
      .then(response => response.json())
      .then(data => {
        updateServicesUI(data);
      })
      .catch(error => {
        console.error('获取服务状态时出错:', error);
      });
  }

  // 更新服务UI
  function updateServicesUI(services) {
    // 更新文档服务状态
    if (services.doc) {
      if (services.doc.running) {
        docStatusBadge.textContent = '运行中';
        docStatusBadge.className = 'badge bg-success';
        startDocBtn.disabled = true;
        stopDocBtn.disabled = false;
        openDocBtn.disabled = false;
      } else {
        docStatusBadge.textContent = '未运行';
        docStatusBadge.className = 'badge bg-secondary';
        startDocBtn.disabled = false;
        stopDocBtn.disabled = true;
        openDocBtn.disabled = true;
      }
    }

    // 未来可以添加更多服务的状态更新
  }

  // 启动服务
  function startService(service) {
    fetch(`/api/services/${service}/start`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        fetchServicesStatus(); // 刷新状态
      })
      .catch(error => {
        console.error(`启动${service}服务时出错:`, error);
      });
  }

  // 停止服务
  function stopService(service) {
    fetch(`/api/services/${service}/stop`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        fetchServicesStatus(); // 刷新状态
      })
      .catch(error => {
        console.error(`停止${service}服务时出错:`, error);
      });
  }

  // 启动所有服务
  function startAllServices() {
    // 目前只有文档服务
    startService('doc');
    
    // 未来可以添加更多服务
  }

  // 停止所有服务
  function stopAllServices() {
    // 目前只有文档服务
    stopService('doc');
    
    // 未来可以添加更多服务
  }
});