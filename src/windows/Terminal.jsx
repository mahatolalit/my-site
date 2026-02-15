import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
    return (
        <div>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>Tech Stack</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@lalit % </span>
                    show tech stack
                </p>
                <div className="label max-sm:hidden">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                            <Check className="check max-sm:hidden" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                        {i < items.length - 1 ? ', ' : ''}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="footnote">
                    <p>
                        <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
                    </p>
                    <p className="text-black">
                        <Flag size={15} fill="black"/>
                        Render time: 8ms
                    </p>
                </div>

            </div>
        </div>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;