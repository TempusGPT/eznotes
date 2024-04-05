import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { Home } from "~/pages/Home";
import { About } from "~/pages/About";

const code = () => (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Router>
);

render(code, document.body);
