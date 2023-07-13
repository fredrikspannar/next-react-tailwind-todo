import { setCompletedTodo } from "../../../services/todo-service";


// api handler for toggling an todo as completed ( or not as completed )
export default async function handler(req, res) {
    const { id, completed } = req.body;

    // note: for a more best-practice RESTful API this should be a PATCH and not a POST

    // use service to mark or unmark as completed
    const result = await setCompletedTodo(id, completed);

    // successful?
    if ( result && typeof result === "object" && result.title ) {
      res.status(200).json({"todo":result});
    } else {
        console.error('/api/todo failed to update todo in backend. Result = ',result);
        res.status(500).json({"message": "Failed to update todo."});
    }

}