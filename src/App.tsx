import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { ChildrenT, RouteT } from "./types/interface";

const renderRoutes = (routes: (RouteT | ChildrenT)[]) => {
    return routes.map((route, index) => {
        if (route?.index) {
            return <Route key={index} index element={route.element} />;
        }

        return (
            <Route key={index} path={route.path} element={route.element}>
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};

const App = () => {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Routes>{renderRoutes(routes)}</Routes>
        </Suspense>
    );
};

export default App;
