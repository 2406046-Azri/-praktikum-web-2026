// File: script.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil elemen DOM
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const todoList = document.querySelector("#todoList");

    const MAX_TASKS = 5; // Batas maksimal tugas

    // 2. Fungsi membaca dan menyimpan data ke LocalStorage
    const getTasks = () => {
        return JSON.parse(localStorage.getItem("todo_tasks")) || [];
    };

    const saveTasks = (tasks) => {
        localStorage.setItem("todo_tasks", JSON.stringify(tasks));
    };

    // 3. Fungsi menampilkan daftar tugas
    const renderTasks = () => {
        const tasks = getTasks();

        todoList.innerHTML = "";

        // Jika belum ada tugas
        if (tasks.length === 0) {
            todoList.innerHTML = `
                <p style="text-align: center; color: #64748b; font-size: 13px; padding: 10px;">
                    Belum ada tugas tersimpan.
                </p>
            `;
            return;
        }

        // Tampilkan setiap tugas
        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            li.className = `todo-item ${task.completed ? "completed" : ""}`;

            li.innerHTML = `
                <span class="todo-text"></span>

                <div class="todo-actions">
                    <button
                        type="button"
                        class="action-btn complete-btn"
                        data-index="${index}"
                    >
                        ${task.completed ? "Batal" : "Selesai"}
                    </button>

                    <button
                        type="button"
                        class="action-btn delete-btn"
                        data-index="${index}"
                    >
                        Hapus
                    </button>
                </div>
            `;

            // Tampilkan teks sebagai teks biasa (mencegah XSS)
            li.querySelector(".todo-text").textContent = task.text;

            todoList.appendChild(li);
        });
    };

    // 4. Tambahkan tugas saat formulir dikirim
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        const tasks = getTasks();

        // Validasi A: Tugas minimal 3 karakter
        if (taskText.length < 3) {
            taskInput.classList.add("error");
            inputError.textContent = "Tugas minimal 3 karakter!";
            inputError.style.display = "block";
            return;
        }

        // Validasi B: Cek apakah jumlah tugas sudah penuh (maksimal 5)
        if (tasks.length >= MAX_TASKS) {
            inputError.textContent = "Maksimal task adalah 5"; // <-- Pesan diubah
            inputError.style.display = "block";
            return; // Hentikan proses, jangan simpan tugas ke-6
        }

        // Jika lolos validasi, hilangkan pesan error
        taskInput.classList.remove("error");
        inputError.style.display = "none";

        // Simpan tugas baru
        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks(tasks);

        // Kosongkan input dan perbarui daftar
        taskInput.value = "";
        renderTasks();
    });

    // 5. Tangani tombol Selesai dan Hapus
    todoList.addEventListener("click", (e) => {
        const button = e.target.closest("button[data-index]");

        if (!button || !todoList.contains(button)) {
            return;
        }

        const index = Number(button.dataset.index);
        const tasks = getTasks();

        if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
            return;
        }

        if (button.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
        } else if (button.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
            
            // Sembunyikan pesan error karena tugas sudah dihapus
            inputError.style.display = "none"; 
        } else {
            return;
        }

        saveTasks(tasks);
        renderTasks();
    });

    // 6. Hilangkan pesan error saat pengguna mulai mengetik
    taskInput.addEventListener("input", () => {
        if (taskInput.value.trim().length >= 3) {
            taskInput.classList.remove("error");
            
            // Jangan sembunyikan error jika tugas masih penuh (5)
            const tasks = getTasks();
            if (tasks.length < MAX_TASKS) {
                inputError.style.display = "none";
            }
        }
    });

    // 7. Tampilkan tugas saat halaman pertama kali dibuka
    renderTasks();
});