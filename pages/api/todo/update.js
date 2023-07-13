
// api handler for updateing the title of a todo
export default async function handler(req, res) {
    const { id, title } = req.body;

    // note: for a more best-practice RESTful API this should be a PUT/PATCH and not a POST

    // send to backend
    const response = await fetch(`${process.env.BACKEND}/todo/update`, {
        method: 'post',
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify( {id: id, title: title} )
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