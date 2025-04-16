import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";

const App = () => {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Routes>
                {routes.map((element, index) => {
                    return (
                        <Route
                            key={index}
                            path={element.path}
                            element={element.element}
                        >
                            {element.children?.map((item, childIndex) => {
                                return (
                                    <Route
                                        key={childIndex}
                                        index={!item.path ? true : false}
                                        path={item.path}
                                        element={item.element}
                                    />
                                );
                            })}
                        </Route>
                    );
                })}
            </Routes>
        </Suspense>
    );
};

export default App;
