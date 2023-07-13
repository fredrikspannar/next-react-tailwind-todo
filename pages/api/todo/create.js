import { createTodo } from "../../../services/todo-service";

// api handler for creating a new todo
export default async function handler(req, res) {
    const { title } = req.body;

    const result = createTodo(title);

    // successful?
    if ( result && typeof result === "object" && result.title ) {
        res.status(200).json({"todo":result});
    } else {
        console.error('/api/todo failed to save new todo in backend. Result = ',result);
        res.status(500).json({"message": "Failed to save new todo."});
    }

}