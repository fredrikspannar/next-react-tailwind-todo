
// api handler for toggling an todo as completed ( or not as completed )
export default async function handler(req, res) {
    const { id, completed } = req.body;

    // note: for a more best-practice RESTful API this should be a PATCH and not a POST

    // send to backend
    const response = await fetch(`${process.env.BACKEND}/todo/completed`, {
        method: 'post',
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify( {id: id, completed: completed} )
      });

    const json = await response.json();

    // successful?
    if ( response.status == 200 ) {
        res.status(200).json(json);
    } else {
        console.error('/api/todo failed to update todo in backend. Response = ',response);
        res.status(500).json({"message": "Failed to update todo."});
    }

}