import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import fs from "fs";

export const disableAmplitude = () => {
    window.amplitude = {
        getInstance: jest.fn().mockImplementation(() => ({
            logEvent: jest.fn().mockImplementation(() => { })
        }))
    };
};

export const renderImport = (ImportComponent) => {
    const store = configureStore()({
        Auth: {
            user: { email: "foo.bar@example.org" },
            token: null,
            error: ""
        }
    });

    return render(
        <Provider store={store}>
            {ImportComponent}
        </Provider>
    );
};

export const loadFilesAsObjectsList = (filesnames, encoding = "utf-8") => {
    const isImage = f => f.match(/jpg$|png$/);

    const images = filesnames.filter(isImage).map(f => {
        const dummyImage = fs.readFileSync(__dirname + "/../__notices__/image.jpg", "binary");
        return new File([new Blob([dummyImage])], f, { type: "binary" });
    });

    const data = filesnames.filter(f => !isImage(f)).map(f => {
        const doc = fs.readFileSync(__dirname + "/../__notices__/" + f, encoding);
        return new File([new Blob([doc])], f, { type: "text/plain" });
    });

    return [...data, ...images];
};

export const summaryPicturesCount = (count = "[0-9]+") => {
    return new RegExp(`.*?(${count}) (?:sont|est) illustrée.*`);
};

export const summaryNewDocsCount = (count = "[0-9]+") => {
    return new RegExp(`.*?(${count}) (?:sont|est) (?:des|une) nouvelles? notice.*`);
};

export const summaryInvalidDocsCount = (count = "[0-9]+") => {
    return new RegExp(`.*?(${count}) notice.? ne peu(?:vent|t) être importée.*`);
};
