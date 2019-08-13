import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        toRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null
    };

    render() {
        const { toRated, popular, airingToday, loading, error } = this.state;
        return (
            <TVPresenter 
                toRated={toRated}
                popular={popular}
                airingToday={airingToday}
                loading={loading}
                error={error}
            />
        );
    }
}