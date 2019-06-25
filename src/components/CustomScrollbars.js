import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
    render() {
        return (
            <Scrollbars
                onScroll={this.handleScroll}
                onScrollFrame={this.handleScrollFrame}
                onScrollStart={this.handleScrollStart}
                onScrollStop={this.handleScrollStop}
                onUpdate={this.handleUpdate}
                renderView={this.renderView}
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderTrackVertical={this.renderTrackVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                renderThumbVertical={this.renderThumbVertical}
                
                autoHeight
                autoHeightMin={0}
                autoHeightMax={700}
                thumbMinSize={30}
                universal={false}
                {...this.props}
                />
        );
    }
}

export default CustomScrollbars;