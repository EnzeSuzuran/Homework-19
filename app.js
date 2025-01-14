Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <div class="todo-item">
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <button @click="$emit('remove')">Удалить</button>
        </div>
    `
});

Vue.component('todo-list', {
    data() {
        return {
            newTodoText: '',
            todos: []
        };
    },
    methods: {
        addTodo() {
            if (this.newTodoText.trim() === '') return;
            const newTodo = {
                id: Date.now(),
                text: this.newTodoText,
                completed: false
            };
            this.todos.push(newTodo);
            this.newTodoText = '';
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        },
        toggleCompletion(todo) {
            todo.completed = !todo.completed;
        }
    },
    template: `
        <div>
            <h1>Список дел</h1>
            <form @submit.prevent="addTodo">
                <input v-model="newTodoText" placeholder="Добавить новую задачу" />
                <button type="submit">Добавить</button>
            </form>
            <div v-for="(todo, index) in todos" :key="todo.id">
                <todo-item :todo="todo" @remove="removeTodo(index)"></todo-item>
                <button @click="toggleCompletion(todo)">Выполнено</button>
            </div>
        </div>
    `
});

new Vue({
    el: '#app'
});
