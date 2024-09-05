import { Link } from "react-router-dom";

/**
 * 
 * @param links : links=[{path: /, name: Home}, {name: Cars}] => Home > Cars 
 * @returns 
 */
export default function BreadCrumb({links = []}) {
    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb py-3 mb-0">
                    {links.map((link, index) => {
                        if (index === links.length - 1) {
                            return (
                                <li key={index} className="breadcrumb-item active" aria-current="page">
                                    {link.name}
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} className="breadcrumb-item">
                                    <Link to={link.path} className="text-decoration-underline">{link.name}</Link>
                                </li>
                            );
                        }
                    })}
                </ol>
            </nav>
        </div>
    )
}