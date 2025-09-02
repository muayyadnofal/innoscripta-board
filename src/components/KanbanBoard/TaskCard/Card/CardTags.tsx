import {Tag} from "../../../ui/Tag/Tag";
import "./card.css"

interface CardTagsProps {
    tags: string[];
}

export const CardTags = (props: CardTagsProps) => {
    const {tags} = props;

    return <div className="card__tags">
        {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </div>
}
