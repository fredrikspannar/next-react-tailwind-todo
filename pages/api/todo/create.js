
// api handler for creating a new todo
export default async function handler(req, res) {
    const { title } = req.body;

    // send to backend
    const response = await fetch(`${process.env.BACKEND}/todo/create`, {
        method: 'post',
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify( {title: title} )
      });

    const json = await response.json();

    // successful?
    if ( response.status == 200 ) {
        res.status(200).json(json);
    } else {
        console.error('/api/todo failed to save new todo in backend. Response = ',response);
        res.status(500).json({"message": "Failed to save new todo."});
    }

}