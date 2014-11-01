/** @jsx React.DOM */
'use strict';
var Chunk = React.createClass({
    getInitialState:function(){
        return{
            image:'',
            width : 150,
            height : 150,
            matrix: {x:0,y:0},
            origPoint : [0,0],
            point : [0,0],
            isMovable:false
        }
    },
    componentDidMount:function(){
        this.setState({
            origPoint: this.props.origPoint,
            point : this.props.origPoint,
            image: this.props.image,
            matrix: this.props.matrix,
            isMovable: this.isMovable(this.props.origPoint,this.props.hole)
        });
    },
    componentWillReceiveProps:function(nextProps){
        var state = {};
        if (nextProps.hole[0] === this.state.point[0] && nextProps.hole[1] === this.state.point[1]) {
            state.point = this.props.hole;
            state.isMovable = this.isMovable(this.props.hole,nextProps.hole);
        } else {
            state.isMovable = this.isMovable(this.state.point,nextProps.hole);
        }
        this.setState(state);
    },
    render:function(){
        var classes = React.addons.classSet({ 'container__chunk':true, 'container__chunk_clickable':this.state.isMovable });
        return <div className={classes} style={this.style()} onClick={this.clickHandler}></div>;
    },

    style:function(){
        return {
            'background-image': 'url(' + this.state.image + ')',
            'background-repeat': 'no-repeat',
            'background-position-x': '-' + this.state.width * this.state.origPoint[0] + 'px',
            'background-position-y': '-' + this.state.height * this.state.origPoint[1] + 'px',
            width: this.state.width + 'px',
            height: this.state.height + 'px',
            left: this.state.point[0] + this.state.width * this.state.point[0] + 'px',
            top: this.state.point[1] + this.state.height * this.state.point[1] + 'px'
        }
    },
    takeHole : function(fn){
        if (this.state.isMovable){
            var callback = fn || function(){};
            this.setState({point:this.props.hole},callback);
        }
    },
    clickHandler:function(){
        if (this.state.isMovable){
            var point = this.state.point;
            this.takeHole(function(){
                this.props.onChunkMoved(point);
            });
        }
    },
    isMovable : function(point,hole){
        return (Math.abs(hole[0] - point[0]) + Math.abs(hole[1] - point[1]) === 1);
    }
});