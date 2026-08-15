/* =====================================================
   BOOKNEST
   BOOK DISCOVERY & READING TRACKER
   ===================================================== */


/* =====================================================
   BOOK DATA
   ===================================================== */

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        rating: 4.8
    },

    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        rating: 4.7
    },

    {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Self-Help",
        rating: 4.7
    },

    {
        id: 4,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Mystery",
        rating: 4.6
    },

    {
        id: 5,
        title: "Ikigai",
        author: "Héctor García & Francesc Miralles",
        category: "Self-Help",
        rating: 4.5
    },

    {
        id: 6,
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        category: "Fiction",
        rating: 4.8
    },

    {
        id: 7,
        title: "Deep Work",
        author: "Cal Newport",
        category: "Technology",
        rating: 4.6
    },

    {
        id: 8,
        title: "The Book Thief",
        author: "Markus Zusak",
        category: "Fiction",
        rating: 4.6
    },

    {
        id: 9,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Self-Help",
        rating: 4.5
    },

    {
        id: 10,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fiction",
        rating: 4.8
    },

    {
        id: 11,
        title: "Steve Jobs",
        author: "Walter Isaacson",
        category: "Biography",
        rating: 4.7
    },

    {
        id: 12,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        rating: 4.7
    },

    {
        id: 13,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        rating: 4.8
    },

    {
        id: 14,
        title: "The Notebook",
        author: "Nicholas Sparks",
        category: "Romance",
        rating: 4.6
    }
];


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const booksGrid =
    document.getElementById("booksGrid");

const bookCount =
    document.getElementById("bookCount");

const emptyState =
    document.getElementById("emptyState");

const emptyTitle =
    document.getElementById("emptyTitle");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const favoritesBtn =
    document.getElementById("favoritesBtn");

const dashboardFavorites =
    document.getElementById("dashboardFavorites");

const resetFilters =
    document.getElementById("resetFilters");

const booksHeading =
    document.getElementById("booksHeading");

const booksSubtitle =
    document.getElementById("booksSubtitle");


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

const FAVORITES_KEY = "booknest_favorites";

const STATUS_KEY = "booknest_reading_status";


/* =====================================================
   LOAD SAVED DATA
   ===================================================== */

let favorites =
    JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
    ) || [];

let readingStatus =
    JSON.parse(
        localStorage.getItem(STATUS_KEY)
    ) || {};


/* =====================================================
   FILTER STATE
   ===================================================== */

let selectedCategory = "All";

let showingFavorites = false;

let selectedStatus = null;


/* =====================================================
   SAVE FAVORITES
   ===================================================== */

function saveFavorites() {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}


/* =====================================================
   SAVE READING STATUS
   ===================================================== */

function saveReadingStatus() {

    localStorage.setItem(
        STATUS_KEY,
        JSON.stringify(readingStatus)
    );
}


/* =====================================================
   BOOK COVER COLORS
   ===================================================== */

function getCoverClass(bookId) {

    const coverNumber =
        ((bookId - 1) % 14) + 1;

    return `cover-${coverNumber}`;
}


/* =====================================================
   DISPLAY BOOKS
   ===================================================== */

function displayBooks(bookList) {

    booksGrid.innerHTML = "";

    bookCount.textContent =
        `${bookList.length} ${
            bookList.length === 1
                ? "book"
                : "books"
        }`;


    if (bookList.length === 0) {

        emptyState.style.display = "block";

        return;
    }


    emptyState.style.display = "none";


    bookList.forEach(book => {

        const isFavorite =
            favorites.includes(book.id);


        const currentStatus =
            readingStatus[book.id] ||
            "Want to Read";


        const bookCard =
            document.createElement("article");


        bookCard.className = "book-card";


        bookCard.innerHTML = `

            <div class="book-cover ${getCoverClass(book.id)}">

                <div class="cover-content">

                    <div class="cover-category">
                        ${book.category.toUpperCase()}
                    </div>

                    <div class="cover-title">
                        ${book.title}
                    </div>

                    <div class="cover-author">
                        ${book.author}
                    </div>

                </div>

            </div>


            <div class="book-info">

                <div class="book-title-row">

                    <h3 class="book-title">
                        ${book.title}
                    </h3>

                    <button
                        class="favorite-btn ${
                            isFavorite
                                ? "active"
                                : ""
                        }"
                        data-id="${book.id}"
                        aria-label="${
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }"
                    >
                        ${
                            isFavorite
                                ? "♥"
                                : "♡"
                        }
                    </button>

                </div>


                <p class="book-author">
                    ${book.author}
                </p>


                <span class="book-category">
                    ${book.category}
                </span>


                <p class="book-rating">
                    ★ ${book.rating}
                </p>


                <select
                    class="status-select"
                    data-id="${book.id}"
                >

                    <option
                        value="Want to Read"
                        ${
                            currentStatus ===
                            "Want to Read"
                                ? "selected"
                                : ""
                        }
                    >
                        Want to Read
                    </option>

                    <option
                        value="Reading"
                        ${
                            currentStatus ===
                            "Reading"
                                ? "selected"
                                : ""
                        }
                    >
                        Reading
                    </option>

                    <option
                        value="Completed"
                        ${
                            currentStatus ===
                            "Completed"
                                ? "selected"
                                : ""
                        }
                    >
                        Completed
                    </option>

                </select>

            </div>
        `;


        booksGrid.appendChild(bookCard);
    });


    attachBookEvents();
}


/* =====================================================
   BOOK EVENTS
   ===================================================== */

function attachBookEvents() {

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-btn"
        );


    favoriteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const bookId =
                    Number(button.dataset.id);

                toggleFavorite(bookId);
            }
        );
    });


    const statusSelects =
        document.querySelectorAll(
            ".status-select"
        );


    statusSelects.forEach(select => {

        select.addEventListener(
            "change",
            () => {

                const bookId =
                    Number(select.dataset.id);

                const newStatus =
                    select.value;

                readingStatus[bookId] =
                    newStatus;

                saveReadingStatus();

                updateDashboard();

                applyFilters();
            }
        );
    });
}


/* =====================================================
   FAVORITES
   ===================================================== */

function toggleFavorite(bookId) {

    if (favorites.includes(bookId)) {

        favorites =
            favorites.filter(
                id => id !== bookId
            );

    } else {

        favorites.push(bookId);
    }


    saveFavorites();

    updateDashboard();

    applyFilters();
}


/* =====================================================
   SEARCH + FILTER
   ===================================================== */

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filteredBooks =
        books.filter(book => {

            const matchesSearch =
                book.title
                    .toLowerCase()
                    .includes(searchText) ||

                book.author
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "All" ||

                book.category ===
                    selectedCategory;


            const matchesFavorites =
                !showingFavorites ||

                favorites.includes(book.id);


            const matchesStatus =
                !selectedStatus ||

                (
                    readingStatus[book.id] ||
                    "Want to Read"
                ) === selectedStatus;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesFavorites &&
                matchesStatus
            );
        });


    updatePageHeading();

    displayBooks(filteredBooks);
}


/* =====================================================
   SEARCH
   ===================================================== */

searchInput.addEventListener(
    "input",
    () => {

        clearSearch.classList.toggle(
            "visible",
            searchInput.value.length > 0
        );

        applyFilters();
    }
);


/* =====================================================
   CLEAR SEARCH
   ===================================================== */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        clearSearch.classList.remove(
            "visible"
        );

        applyFilters();

        searchInput.focus();
    }
);


/* =====================================================
   CATEGORY FILTER
   ===================================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            selectedCategory =
                button.dataset.category;


            selectedStatus = null;

            showingFavorites = false;

            favoritesBtn.classList.remove(
                "active"
            );


            applyFilters();
        }
    );
});


/* =====================================================
   FAVORITES BUTTON
   ===================================================== */

favoritesBtn.addEventListener(
    "click",
    () => {

        showingFavorites =
            !showingFavorites;

        selectedStatus = null;


        if (showingFavorites) {

            favoritesBtn.classList.add(
                "active"
            );

        } else {

            favoritesBtn.classList.remove(
                "active"
            );
        }


        applyFilters();

        document
            .getElementById("books")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* =====================================================
   DASHBOARD STATUS FILTERS
   ===================================================== */

const dashboardCards =
    document.querySelectorAll(
        "[data-status-filter]"
    );


dashboardCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            selectedStatus =
                card.dataset.statusFilter;

            showingFavorites = false;

            favoritesBtn.classList.remove(
                "active"
            );


            applyFilters();


            document
                .getElementById("books")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );
});


/* =====================================================
   DASHBOARD FAVORITES
   ===================================================== */

dashboardFavorites.addEventListener(
    "click",
    () => {

        showingFavorites =
            !showingFavorites;

        selectedStatus = null;


        favoritesBtn.classList.toggle(
            "active",
            showingFavorites
        );


        applyFilters();


        document
            .getElementById("books")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* =====================================================
   RESET FILTERS
   ===================================================== */

resetFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        selectedCategory = "All";

        selectedStatus = null;

        showingFavorites = false;


        clearSearch.classList.remove(
            "visible"
        );


        categoryButtons.forEach(
            button => {

                button.classList.remove(
                    "active"
                );

                if (
                    button.dataset.category ===
                    "All"
                ) {

                    button.classList.add(
                        "active"
                    );
                }
            }
        );


        favoritesBtn.classList.remove(
            "active"
        );


        applyFilters();
    }
);


/* =====================================================
   UPDATE DASHBOARD
   ===================================================== */

function updateDashboard() {

    const wantCount =
        document.getElementById(
            "wantCount"
        );

    const readingCount =
        document.getElementById(
            "readingCount"
        );

    const completedCount =
        document.getElementById(
            "completedCount"
        );

    const favoriteCount =
        document.getElementById(
            "favoriteCount"
        );

    const headerFavoriteCount =
        document.getElementById(
            "headerFavoriteCount"
        );


    let want = 0;

    let reading = 0;

    let completed = 0;


    books.forEach(book => {

        const status =
            readingStatus[book.id] ||
            "Want to Read";


        if (status === "Want to Read") {
            want++;
        }

        if (status === "Reading") {
            reading++;
        }

        if (status === "Completed") {
            completed++;
        }
    });


    wantCount.textContent = want;

    readingCount.textContent = reading;

    completedCount.textContent = completed;

    favoriteCount.textContent =
        favorites.length;

    headerFavoriteCount.textContent =
        favorites.length;
}


/* =====================================================
   UPDATE PAGE HEADING
   ===================================================== */

function updatePageHeading() {

    if (showingFavorites) {

        booksHeading.textContent =
            "My Favorites";

        booksSubtitle.textContent =
            "Books you have saved for later.";

        emptyTitle.textContent =
            "No favorites yet";

        emptyMessage.textContent =
            "Tap the heart on a book to add it to your favorites.";

        return;
    }


    if (selectedStatus) {

        booksHeading.textContent =
            selectedStatus;

        booksSubtitle.textContent =
            "Books in your reading list.";

        emptyTitle.textContent =
            "No books in this list";

        emptyMessage.textContent =
            "Change a book's reading status to see it here.";

        return;
    }


    booksHeading.textContent =
        "Explore Books";

    booksSubtitle.textContent =
        "Find something worth reading.";

    emptyTitle.textContent =
        "No books found";

    emptyMessage.textContent =
        "Try another search or choose a different category.";
}


/* =====================================================
   INITIALIZE
   ===================================================== */

updateDashboard();

updatePageHeading();

displayBooks(books);