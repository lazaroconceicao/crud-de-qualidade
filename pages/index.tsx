import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyle";
import { todoController } from "@uicontroller/todo";

// const bg = "https://raw.githubusercontent.com/devsoutinho/aulas-crudcomqualidade.io/2f69fc697f76c1ed6385480b649185a0d258da5b/public/bg.jpeg";
const bg = "/bg.jpeg"; //inside public folder

interface HomeTodo {
    id: string;
    content: string;
}

export default function Page() {
    const [todos, setTodos] = React.useState<HomeTodo[]>([]);

    // Load infos onload
    React.useEffect(() => {
        todoController.get().then((todos) => {
            setTodos(todos);
        });
    }, []);

    return (
        <main>
            <GlobalStyles themeName="devsoutinho" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Correr, Estudar..." />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{todo.id.substring(0, 4)}</td>
                                    <td>{todo.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                Carregando...
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td colSpan={4} align="center">
                                Nenhum item encontrado
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button data-type="load-more">
                                    Carregar mais{" "}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        ↓
                                    </span>
                                </button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
