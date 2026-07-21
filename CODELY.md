

## Codely Structured Memories

### User

### Feedback
- [2026-07-21 00:31:45] [feedback] User confirmed: follow documented architecture (Tuanjie Engine C# + ASP.NET Core C#), full microservice split, generate directory skeleton + README + config files + entry code templates. Old Vite/TS web client was removed and renamed client/→game/. **Why:** docs describe Tuanjie+ASP.NET Core stack; web client conflicted with single-client-source principle. **How to apply:** never reintroduce a second web client; game/ is the only client directory.

### Project
- [2026-07-21 00:31:45] [project] Fixed 2 package reference bugs in server .csproj files: (1) Gateway was missing Yarp.ReverseProxy 2.1.0 (Program.cs uses AddReverseProxy/MapReverseProxy), (2) RealtimeService had redundant Microsoft.AspNetCore.SignalR instead of Microsoft.AspNetCore.SignalR.StackExchangeRedis 8.0.2 (Program.cs uses .AddStackExchangeRedis backplane). **Why:** TRAE wrote real JWT auth but didn't verify .csproj deps match. **How to apply:** if dotnet build fails on missing packages, check .csproj vs Program.cs using statements.
- [2026-07-21 10:43:13] [project] Validated project planning system against Codely skill library (unity-tutorial-planner not suitable for MMORPG — designed for simple 30-min games). Extracted 4 universal patterns from skill library and integrated into project docs: (1) compile gate (dotnet build 0 error), (2) 4-tier asset priority (reuse→primitive→AI generate→import), (3) global constraints single-source doc, (4) structured handoff format. **Why:** project docs had strong planning but lacked operational execution rules. **How to apply:** agents now follow agent-execution-protocol.md §5 execution loop; all P1 tasks reference global-constraints.md as first read.

### Reference
- [2026-07-21 00:31:45] [reference] Project management docs live at doc/guides/project-management/: ai-driven-development-plan.md (P0-P4 roadmap), task-board.md (all task IDs + status), current-task-packs.md (ready-to-execute tasks), design-review-queue.md (18 pending design decisions), agent-execution-protocol.md (agent rules), task-template.md. Agent rules also in .trae/rules/01-04. VitePress config: doc/.vitepress/config.mts.
