// router
import { Link } from "react-router-dom"

export const TestPage = () => {

    return (
    <div className="test-page">
        <Link to={`/test/clicked`}>click the link</Link>
    </div>
    )
}
