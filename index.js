const homePage = {
    initialize: function() {
        document.getElementById('content').innerHTML = '<h2>Home Page</h2>';
    }
};

const aboutPage = {
    initialize: function() {
        document.getElementById('content').innerHTML = '<h2>About Page</h2>';
    }
};

const contactPage = {
    initialize: function() {
        document.getElementById('content').innerHTML = '<h2>Contact Page</h2>';
    }
};

const postsPage = {
    initialize: function() {
        document.getElementById('content').innerHTML = '<h2>Posts Page</h2>';
    }
};

const app = {
    template: `
        <div>
            <h1>SPA</h1>
            <a onclick="app.methods.route(event)" href="/">Home</a>
            <a onclick="app.methods.route(event)" href="about.html">About</a>
            <a onclick="app.methods.route(event)" href="contact.html">Contact</a>
            <a onclick="app.methods.route(event)" href="posts.html">Posts</a>
            <div id="content"></div>
        </div>
    `,
    data: function() {
        return {
            routes: {
                '/': 'Home',
                '/about.html': 'About',
                '/contact.html': 'Contact',
                '/posts.html': 'Posts'
            }
        };
    },
    pages: {
        'Home': homePage,
        'About': aboutPage,
        'Contact': contactPage,
        'Posts': postsPage
    },
    methods: {
        initialize: function() {
            document.getElementById('root').innerHTML = app.template;
            window.addEventListener('popstate', this.handlePath);
            this.handlePath();
        },
        route: function(event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, null, event.target.href);
            this.handlePath();
        },
        handlePath: function() {
            const path = window.location.pathname;
            const route = app.data().routes[path] || false;
            if (route) {
                const currentPage = app.pages[route];
                currentPage.initialize();
            }
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    app.methods.initialize();
});