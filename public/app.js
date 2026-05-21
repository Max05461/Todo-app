const STORAGE_KEY = 'todos';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filter = 'all';

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(text) {
  todos.push({
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  });
  save();
  render();
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  save();
  render();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function getFiltered() {
  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'completed') return todos.filter(t => t.completed);
  return todos;
}

function render() {
  const list = document.getElementById('todo-list');
  const emptyState = document.getElementById('empty-state');
  const filtered = getFiltered();
  const activeCount = todos.filter(t => !t.completed).length;

  document.getElementById('item-count').textContent =
    `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  if (filtered.length === 0) {
    list.innerHTML = '';
    emptyState.classList.remove('d-none');
  } else {
    emptyState.classList.add('d-none');
    list.innerHTML = filtered.map(todo => `
      <li class="list-group-item d-flex align-items-center gap-2 py-3">
        <input
          type="checkbox"
          class="form-check-input flex-shrink-0"
          ${todo.completed ? 'checked' : ''}
          onchange="toggleTodo('${todo.id}')"
        >
        <span class="flex-grow-1 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}">
          ${escapeHtml(todo.text)}
        </span>
        <button
          class="btn btn-sm btn-outline-danger"
          onclick="deleteTodo('${todo.id}')"
          title="Delete"
        >
          <i class="bi bi-trash"></i>
        </button>
      </li>
    `).join('');
  }

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

document.getElementById('todo-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  if (input.value.trim()) {
    addTodo(input.value);
    input.value = '';
  }
});

document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    render();
  });
});

document.getElementById('clear-completed').addEventListener('click', clearCompleted);

render();
