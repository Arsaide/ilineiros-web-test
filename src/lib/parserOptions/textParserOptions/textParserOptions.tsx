import { HTMLReactParserOptions, Element } from 'html-react-parser';
import { MainColors } from '../../colors/MainColors';
import React from 'react';

export const textParserOptions: HTMLReactParserOptions = {
    replace: domNode => {
        if (domNode instanceof Element) {
            const allowedTags = ['b', 'i', 'u', 'br'];
            if (!allowedTags.includes(domNode.name)) {
                return (
                    <>
                        <div>
                            <b style={{ color: MainColors.WHITE }}>
                                ❗You wrote something wrong...🤔
                            </b>
                        </div>
                        <img
                            src="/gifs/vahui.gif"
                            alt="Error"
                            style={{
                                width: '100%',
                                maxWidth: '250px',
                                marginTop: '10px',
                            }}
                        />
                    </>
                );
            }
        }
    },
};
