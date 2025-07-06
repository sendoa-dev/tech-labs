const generateId = () => Math.random().toString(36).substr(2) + Date.now().toString(36)

type Subtask = {
  id: String;
  title: string;
  isCompleted: boolean;
};

type Task = {
  id: String;
  title: string;
  description: string;
  subtasks: Subtask[];
};

type Column = {
  id: String;
  name: string;
  tasks: Task[];
};

type Board = {
  id: String;
  name: string;
  columns: Column[];
};

const createSubtasks = (titles: [string, boolean][]): Subtask[] =>
  titles.map(([title, isCompleted]) => ({
    id: generateId(),
    title,
    isCompleted,
  }))

const createTask = (
  title: string,
  description: string,
  subtasks: [string, boolean][],
): Task => ({
  id: generateId(),
  title,
  description,
  subtasks: createSubtasks(subtasks),
})

const createColumn = (name: string, tasks: Task[]): Column => ({
  id: generateId(),
  name,
  tasks,
})

const createBoard = (name: string, columns: Column[]): Board => ({
  id: generateId(),
  name,
  columns,
})

const platformLaunchBoard = createBoard('Platform Launch', [
  createColumn('Todo', [
    createTask('Build UI for onboarding flow', 'Create user-friendly onboarding screens.', [
      ['Subtask 1', true],
      ['Subtask 2', true],
      ['Subtask 3', false],
    ]),
    createTask('Build UI for search', 'Implement the search interface.', [['Subtask', false]]),
    createTask('Build settings UI', 'Develop the settings panel for user preferences.', [
      ['Subtask 1', false],
      ['Subtask 2', false],
    ]),
    createTask(
      'QA and test all major user journeys',
      'Ensure quality and smooth flow across core features.',
      [
        ['Subtask 1', false],
        ['Subtask 2', false],
      ],
    ),
  ]),
  createColumn('Doing', [
    createTask(
      'Design settings and search pages',
      'Create designs for the settings and search functionality.',
      [
        ['Subtask 1', true],
        ['Subtask 2', true],
        ['Subtask 3', false],
      ],
    ),
    createTask(
      'Add account management endpoints',
      'Backend API for managing user accounts.',
      [
        ['Subtask 1', true],
        ['Subtask 2', true],
        ['Subtask 3', false],
      ],
    ),
    createTask('Design onboarding flow', 'Design layout and flow for user onboarding.', [
      ['Subtask 1', false],
      ['Subtask 2', false],
      ['Subtask 3', false],
    ]),
    createTask('Add search endpoints', 'Create backend endpoints for search functionality.', [
      ['Subtask 1', true],
      ['Subtask 2', false],
    ]),
    createTask(
      'Add authentication endpoints',
      'Implement login and signup endpoints.',
      [
        ['Subtask 1', true],
        ['Subtask 2', false],
      ],
    ),
    createTask(
      'Research pricing points of various competitors and trial different business models',
      'Explore competitor pricing and test different models.',
      [['Subtask', false]],
    ),
  ]),
  createColumn('Done', [
    createTask('Conduct 5 wireframe tests', 'Usability testing of wireframes.', [['Subtask', true]]),
    createTask('Create wireframe prototype', 'Low-fidelity prototype for early feedback.', [
      ['Subtask', true],
    ]),
    createTask(
      'Review results of usability tests and iterate',
      'Analyze usability results and update accordingly.',
      [
        ['Subtask 1', true],
        ['Subtask 2', true],
        ['Subtask 3', true],
      ],
    ),
    createTask(
      'Create paper prototypes and conduct 10 usability tests with potential customers',
      'Early testing with paper-based wireframes.',
      [
        ['Subtask 1', true],
        ['Subtask 2', false],
      ],
    ),
    createTask('Market discovery', 'Research potential market segments.', [['Subtask', true]]),
    createTask(
      'Competitor analysis',
      'Compare top competitors’ features and strategies.',
      [
        ['Subtask 1', true],
        ['Subtask 2', true],
      ],
    ),
    createTask('Research the market', 'General market landscape research.', []),
  ]),
])

const marketingPlanBoard = createBoard('Marketing Plan', [])
const roadmapBoard = createBoard('Roadmap', [])

export const boards: Board[] = [platformLaunchBoard, marketingPlanBoard, roadmapBoard]
