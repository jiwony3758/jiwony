import "@/styles/blog.css";
import DateView from "../DateView";

export default function PostItem({
    date,
    title,
    description,
    tags,
}: {
    date: string;
    title: string;
    description: string;
    tags: string[];
}) {
    return <li className="post-item">
        <div className="post-header">
            {tags && tags.length > 0 ?
                <span className="tag-list">
                {tags.map((tag, index) => <span className="tag" key={index}>{tag}</span>)}
            </span>
						: <></>
            }
            {/* <span className="post-created-at">{date}</span> */}
            <DateView dateString={date}/>
        </div>       
        <span className="post-title">{title}</span>
        <span className="post-description">{description}</span>
    </li>
}