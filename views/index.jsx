var React = require('react');
var ReactDOM = require('react-dom');
require('react-tap-event-plugin')();
var Card = require('material-ui/lib/card/card');
var CardActions = require('material-ui/lib/card/card-actions');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardTitle = require('material-ui/lib/card/card-title');
var FlatButton = require('material-ui/lib/flat-button');
var CardText = require('material-ui/lib/card/card-text');
var TextField = require('material-ui/lib/text-field');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var Snackbar = require('material-ui/lib/snackbar');
var superagent = require('superagent');

var App = React.createClass({
    displayName: 'App',
    getInitialState: function() {
        return {
            name: '',
            studentId: '',
            majorAndClass: '',
            sex: 'male',
            tel: '',
            snackbarOpen: false,
            snackbarMessage: '',
        };
    },
    onNameChange: function(e) {
        this.setState({
            name: e.target.value,
        });
    },
    onStudentIdChange: function(e) {
        this.setState({
            studentId: e.target.value,
        });
    },
    onMajorAndClassChange: function(e) {
        this.setState({
            majorAndClass: e.target.value,
        });
    },
    onSexChange: function(e, v) {
        this.setState({
            sex: v,
        });
    },
    onTelChange: function(e) {
        this.setState({
            tel: e.target.value,
        });
    },

    submit: function() {
        if (!this.state.name)
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'please tell us your name'
            });
        else if (!this.state.studentId)
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'please tell us your student ID'
            });
        else if (!this.state.majorAndClass)
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'please tell us your major and class'
            });
        else if (!this.state.tel)
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'please tell us your phone number'
            });
        else
            superagent.post('submit.php')
                .type('json')
                .send({
                    name: this.state.name,
                    studentId: this.state.studentId,
                    majorAndClass: this.state.majorAndClass,
                    sex: this.state.sex,
                    tel: this.state.tel,
                })
                .end(function(err, res) {
                    if (res.body.code == 0) {
                        this.setState({
                            snackbarOpen: true,
                            snackbarMessage: 'Success',
                        });
                    } else if (res.body.code < 0) {
                        this.setState({
                            snackbarOpen: true,
                            snackbarMessage: 'Unknown Error',
                        });
                    } else {
                        this.setState({
                            snackbarOpen: true,
                            snackbarMessage: 'Error Code: ' + res.body.code,
                        });
                    }
                }.bind(this));
    },
    handleJump: function() {
        window.location = 'https://github.com/xjtu-siyue';
    },
    onSnackBarClose: function() {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: '',
        });
    },
    render: function() {
        return (
            <Card>
                <CardHeader
                    title="Hobo Chen"
                    subtitle="The student leader of XJTU/ICPC"
                    avatar="https://lh3.googleusercontent.com/-QL9j3FJPq5M/AAAAAAAAAAI/AAAAAAAAAAA/qUglx2pJgmw/s46-c-k-no/photo.jpg"
                    />
                <CardMedia
                    overlay={<CardTitle title="ACM/ICPC" subtitle="International Collegiate Programming Contest" />}
                    >
                    <img src="banner.jpg" />
                </CardMedia>
                <CardTitle
                    title="XJTU ACM/ICPC Personal Registration"
                    subtitle="Fill the form below to register"
                    />
                <CardText>
                    <TextField
                        floatingLabelText="Your name"
                        hintText="tell us your real name"
                        fullWidth={true}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        />
                    <br/>
                    <TextField
                        floatingLabelText="Your student ID"
                        hintText="tell us your student ID"
                        fullWidth={true}
                        value={this.state.studentId}
                        onChange={this.onStudentIdChange}
                        />
                    <br/>
                    <TextField
                        floatingLabelText="Major & Class"
                        hintText="full-name of major with class number, Sample: 软件工程42"
                        fullWidth={true}
                        value={this.state.majorAndClass}
                        onChange={this.onMajorAndClassChange}
                        />
                    <br/>
                    <RadioButtonGroup
                        name="Sex"
                        valueSelected={this.state.sex}
                        onChange={this.onSexChange}
                        >
                        <RadioButton
                            value="male"
                            label="Male"
                            />
                        <RadioButton
                            value="female"
                            label="Female"
                            />
                    </RadioButtonGroup>
                    <br/>
                    <TextField
                        floatingLabelText="Your Phone Number"
                        hintText="tell us your phone number to keep in touch"
                        fullWidth={true}
                        value={this.state.tel}
                        onChange={this.onTelChange}
                        />

                </CardText>
                <CardActions>
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onTouchTap={this.submit}
                        keyboardFocused={true}
                        />
                    <FlatButton
                        label="goto XJTU-siyue"
                        secondary={true}
                        onTouchTap={this.handleJump}
                        />
                </CardActions>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.onSnackBarClose}
                    />
            </Card>
        );
    }
});

var app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App/>, app);

document.title = 'XJTU ACM/ICPC Personal Registration'