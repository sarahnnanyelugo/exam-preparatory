import React, {useState, useContext, useRef} from "react";
import "./tag-input.scss"

export const TagInput = ({onChangeMain}) => {
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };
    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if ((key === ',' || key === ' ' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            // setTags(prevState => [...prevState, trimmedInput]);
            setTags(
                (prevState) => {
                    const newState = [...prevState, trimmedInput];
                    onChangeMain(newState);
                    return newState;
                });
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            onChangeMain(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }
    const deleteTag = (index) => {
        setTags(
            (prevState) => {
                const newState = prevState.filter((tag, i) => i !== index);
                onChangeMain(newState);
                return newState;
            })

    }
    return (
        <>
            <div className="container">
                {tags.map((tag,key) =>
                    <div key={key} className="tag">
                    {tag}
                    <button onClick={() => deleteTag(key)}>x</button>
                </div>)}
                <input
                    value={input}
                    placeholder="Email, comma or space separated"
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
