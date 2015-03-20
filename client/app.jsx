/** @jsx React.DOM */

var React   = require('react');
var signals = require('signals');
var imm     = require('imm');


var robotStore = (function () {
	var robots    = imm([]);
	var onChanged = new signals.Signal();

	function all() {
		return robots.array();
	}

	function add(item) {
		robots = robots.add(item);
		onChanged.dispatch();
	}

	function replace(items) {
		robots = robots.replace(items);
		onChanged.dispatch();
	}

	return {
		all: all,
		add: add,
		replace: replace,
		onChanged: onChanged
	}
}());


var Robot = React.createClass({
	propTypes: {
		robot: React.PropTypes.object.isRequired,
	},
	render: function() {
		return (
			<div>
				<span>Robot</span>
				{this.props.robot.id}
				{this.props.robot.label}
			</div>
		);
	}
});

var RobotList = React.createClass({
	propTypes: {
		robots: React.PropTypes.array.isRequired,
	},
	render: function() {
		var robots = this.props.robots.map(function (robot) {
			return <Robot robot={robot} />
		});
		return (
			<div>
				<span>RobotList</span>
				{robots}
			</div>
		);
	}
});

var App = React.createClass({
	getInitialState: function () {
		return {
			robots: []
		}
	},
	componentDidMount: function () {
		robotStore.onChanged.add(this.onChanged);
	},
	componentWillUnmount: function () {
		robotStore.onChanged.remove(this.onChanged);
	},
	onChanged: function () {
		console.log('onChanged');
		this.setState({
			robots: robotStore.all()
		});
	},
  render: function() {
		return (
			<div>
				<RobotList robots={this.state.robots} />
			</div>
		);
	}
});
React.render(
	<App />,
	document.getElementById('app')
);

// Connect to SocketIO on the same host
var socket = io.connect();

socket.on('todos created', function(todo) {
	console.log('Someone created a new Todo', todo);
	// onChanged.dispatch(todo);
	robotStore.add(todo);
});

socket.on('todos updated', function(todo) {
  console.log('Someone updated a Todo', todo);
});

socket.on('todos patched', function(todo) {
  console.log('Someone patched', todo);
});

socket.emit('todos::create', {
  label: 'AA'
}, {}, function(error, todo) {
  socket.emit('todos::find', {}, function(error, todos) {
    console.log('Todos from server:', todos);
    robotStore.replace(todos);
  });
});