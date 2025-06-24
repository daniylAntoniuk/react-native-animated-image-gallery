import React from "react";
type Props = {
    label: string;
    description?: string;
    image?: any;
    data?: any;
    onPress?: (data: any) => void;
};
export declare function ListItem(props: Props): React.JSX.Element;
export {};
