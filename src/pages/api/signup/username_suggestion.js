
import axios from "axios";


export default async function username_suggestion(req, res) {
    try {
        let url = `${process.env.development_ip}/username_suggestion`

        const response = await axios.post(url, { username: req?.body?.username });
        return res
            .status(200)
            .json({ results: response.data, message: "", success: true });
    } catch (error) {
        return res.status(200).json({ results: error, message: "", success: false });
    }

}
