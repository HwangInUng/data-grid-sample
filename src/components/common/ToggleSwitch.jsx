import tw, { styled } from "twin.macro";

const ToggleLabel = styled.label`
    ${tw`
        inline-flex
        items-center
        gap-[0.5rem]
        cursor-pointer
    `}

    &:hover{
        transition: transform 150ms linear;
        transform: scale(1.05);
    }
`;

const ToggleInput = styled.input`
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.5em;
    height: 1.25em;
    background-color: gray;
    cursor: pointer;

    &::before{
        content: "";
        position: absolute;
        left: 0;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        transform: scale(0.8);
        background-color: white;
        transition: left 250ms linear;
    }

    &:checked{
        background-color: darkblue;
        border-color: darkblue;
        &::before{
            background-color: white;
            left: 1.25em;
        }
    }

    &:disabled{
        border-color: lightgray;
        opacity: 0.7;
        cursor: not-allowed;
        &::before{
            border-color: lightgray;
        }

        & + span{
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    &:focus-visible{
        outline-offset: max(2px, 0.1em);
        outline: max(2px, 0.1em) solid darkblue;
    }

    &:enabled:hover{
        box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    }
`;

export const ToggleSwitch = ({ title, onChange, flag }) => {
    return (
        <>
            <ToggleLabel>
                <span>{title}</span>
                <ToggleInput
                    role="switch"
                    type="checkbox"
                    checked={flag}
                    onChange={onChange}
                />
            </ToggleLabel>
        </>
    );
};