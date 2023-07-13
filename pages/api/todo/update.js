import { updateTodo } from "../../../services/todo-service";

// api handler for updateing the title of a todo
export default async function handler(req, res) {
    const { id, title } = req.body;

    // note: for a more best-practice RESTful API this should be a PUT/PATCH and not a POST

    const result = await updateTodo(id, title);

    // successful?
    if ( result && typeof result === "object" && result.title ) {
      res.status(200).json({"todo":result});
    } else {
        console.error('/api/todo failed to update todo. Result = ',result);
        res.status(500).json({"message": "Failed to update todo."});
    }

}