# General Description
This app is an app managed to be of support to a persons workflow, similar to jira.
this app should be a slick app where a person can manage his tasks and todo lists.

# Implementation details
1. The code should be clean and readable - variable names should be understandable, and you should be able to understand what the code does just from reading it, though comments are still recommended.
2. The user should be able to write, for each task, a sort of "task journal" in markdown syntax with rich preview, like obsidian.
3. The theme should be a slick modern dark theme, with a switch to light theme
4. Every new day that passes (whether the app is open or not) the user should be prompted to select what tasks/subtasks he would like to get done today, from the pool of tasks/subtasks he had written down. Then these tasks should be presented clearly as today's top tasks. each new week he should be prompted to select the tasks he would like to get done this week but this should be able to be changed each day with a link at the "today's top tasks' question that allows him to reconfigure the week's top tasks
5. Tasks that exist for more than 2 weeks and are not categorized as "backlog" should turn more and more red with each time that passes

# Tech stack
React + TypeScript (Vite), built as a web app first and wrapped in Electron for desktop packaging later.
- State: Zustand
- Persistence: localStorage via a storage adapter (swappable for disk storage once wrapped in Electron)
- Markdown editing/preview: CodeMirror 6 + react-markdown/remark-gfm
- Dates: date-fns
- Icons: lucide-react
- Linting/formatting: oxlint + Prettier
- UI components: shadcn/ui (base/nova preset) + Tailwind CSS v4

# Language & direction
The app's UI is in Hebrew, right-to-left (RTL).
- `index.html` sets `<html lang="he" dir="rtl">` — this drives layout direction for the whole app
- shadcn/ui's components (notably the sidebar) already ship RTL-aware Tailwind classes (`rtl:`/`ltr:` variants, logical `start`/`end` spacing), so no component rework was needed — only the `dir`/`lang` attributes and the UI copy itself
- All user-facing strings (nav labels, headings, button text, aria-labels) are written in Hebrew directly in the components
- Code itself (variable/function/component names, comments, commit messages) stays in English, per the "clean and readable code" rule above — only text rendered to the user is Hebrew

The user's background is C, C#, C++, Python, and basic React/JS/HTML/CSS.

# Planning
The build is divided into stages, each ending in a runnable app, each kept small enough that a single agent session can complete it without mistakes:
- Stage 0: project scaffold (done)
- Stage 1: theming foundation (dark/light) + app shell (done)
- Stage 2: data layer & persistence
- Stage 3: task & subtask CRUD
- Stage 4: markdown task journal
- Stage 5: daily & weekly planning prompts
- Stage 6: task aging visualization
- Stage 7: web polish
- Stage 8: Electron desktop wrap

# Workflow
- Repo: git initialized locally, remote at github.com:alon-dev/task-management.git
- Each stage is built on its own branch, pushed, and opened as a pull request on GitHub (via `gh`) for review before merging
- Verify each stage by actually running the app (dev server + headless browser check), not just by building/linting
