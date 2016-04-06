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
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAABrCAMAAAD951N3AAABEVBMVEX///+wKhlKgcL/1R0AQXQAPnIANW0AOW8AL2oAM2wAMWv5+/1BfcD/1AoAP3O5zOX/54StHACuIQv/+eL/5Hz04d7lvblqiKbYmpKUstrGZ13u8/fS3ujM2OI8ZIyTq8GbssX/7KZ6odExW4b/9tGuwdGrAAAAR3qHoLcAKmcAI2T/2TL//vf/8LYWTHzn7vNMdZr/8sD//OxXfqC6yNb/3Eh8mLPu0s6sw+HSi4P/9c7/6I4AIGPNfnX68O50nM+3PS5Yi8f/3lfT4PAnVYKKrNf/7J4zdb3K2exSdpm9T0F0j6vG0t3CXVH/4WbYmZLhs63KdWrrysUAGGC2NyW5QzQAD12/VEfdqaNjksr/4m8z6vcqAAAYXElEQVR4nO2dj1+a3vfHrwVcEaVpK2YgUkaiGViYWVuWRUvSWutdn+X+/z/key6/REWztdXal9fj8X4nXC4gT865554DDqG/Qiurh2sPuVzi+vjxoP3WJxPr9+jg+DSbO726vr5+SGQTPz6tvPUJxXq52sfZrYdvdytgpe32we13WHp863OK9VKt3m+t3YVXtB8ftn7EBvu+dXufexwfTVeOs1cHb3I2sX6PDrKJ1YjVn7L3sb2+X7WvclFUEXrMXscR8bvVt61vU1oOtz696pnE+n1aOb2f1tS+P43d8DvVY3a6ST5m42nOO9X1jMBo5fT6Fc8k1u9TO7s2o3UtGwdN71IHW4czWr9txXPXd6nVrVnD5+NW9Nwn1l+u263bX26N9dcqxvpPaja42Am/U93NzCQdxiHT+9TK1vGM1rVcPMF5l5o5b20/XL3emcR6Skfre3Nv+2NG3vcuO2tSG+uV9TGzOfe237LTo6LDGW2xXkm1wERDWI+estu73NTBtX3/EA+tb629m5ua93GIdXnx7Ilu7euped/VmYnFWK+i2s/MkfdxiHU98/mpfo/TZq7ttVw8vXl77WY+ep8CrLWz7SdH2fbpVXTQdDtz7hPrlVTb3152PwVYjwLSM/QY/dRL+0c2fjbib1DgcQOsHzK7c/Q7TdxFrD2MR9Y3lR8oob3tbTfu9bEub28PG6cDvrs/nYyabrfi5w7fUrs3wRzmc2bH+etj3RkGTHs/Zxju49b3cYSr9/dxvPSW+pk584ZUtJlx5zg+1rNFP2CqnWXOZsxgj7e+j664S8SZiLdV7XNmeziz2XX/ODiBsrd+cz/zoRbV2ddx9jocHz1mT2Oqb63Piz5Xb47jYfV98pNU2+0V4Bo43fZxIvfj+HA1HlvfVuuZRQ/gvuN2dz4ThxtEUJvbmQ8zeq98f0g8XN/ncu5TTe3H02w2uwX6EXN9Wx0tesHR7ofhCLp89tX5u7OYWZ/R9y6X/bF2Td5Dz/64QwfHiWxi7fD2YGXlcObTa7FeQbv7mc8TbnbPWbOz6JtytL5vgbdtr9wdJxLZQ3Swlkskjg84RMpy017OifVaWt7P/IwcPocOmmy1PNHevs6urrRXDh7XEglnTnOfuAf/e3i7+j1+Pu1tVPu5M0w33ASZ/rD2zoIwGS1/jqrn3Ca2conc1tbDj6yTA37MHq4eP8Dgmv0+uXGsV9BRJnO264OdkkZaDmp0n7cz21GD7MG372trh6sQDDs5xPaPBDjlg9XbuzhieiNtfgSwOzNnpJ7AUgHqrJr6yunVARGESvGY+tba/Lg4B1gCdf+JB5wOtyAYTuRA2dM4b/jmcix2dxZY1/0+9fTL4fHx8en9saOoik6sV9bmh8XM1xntO2Cp8zhqhI7v4/H0L9Lmx8mZy1C1uZ8vfYwzEP+i2vGPu/yT+hZnlv5FtdfiOuu/qPZaLh5ef5+M7tIc6hqTPfd219fXd9DyV0/rX3dQbWc90NdlBEs7m5Ox8Mrt8dqErtduD76HV3z/FE93flFcfrCQnkMLgxY31nV9fzGTyezXNjO+FnfQ10xIR2gb/r/9czxYXr3KZnOTuj9uH1yHG7KJ4ziO+hUZJ+mFOXV5McK19iGzSLS9vLy96Gp7F3krXWWWa05TZuxJ8NtsLhGp7NUK+p4dWbMWc32+uI25qS4spC/CXb96AMEk972Pm2jv435mCHa/tuwuZPbD09eD+ylUE4ncwx06HGmNizm/oO78UInOhz0DE8189U10+8PuXm1v98O+3/IR7WaCjYY6nkoVuJ4eoMNRe40f8H+2Lp5hrGCurWHPdd8oM2foyP8IwygpnK+7yDMhn7w/DJva99OpAtfEmB+Of/zw+eo8y1jTodE1NIgeoY++US5+PEKbH7Z93sv7wUbDqGllhrESrj9W2muhTWb83mWsKXoW1YX0xhDrxwAr+NpNL2T6sImWPy76LTvB+PscrGQ0PQgZdJx8er5+B1bibB2XnLnZ3UN76zfe2s/D8fdZWBPZW/Q4dMOxtT5fvwfr/jL6nHFnMjdfl9HmvsO4VrvJ/BLW3FW7/RBjfYF+C1aCkKQh3NH1qPaZ/P1Z81A/Hysx10+Bub4ZVqkQkVibUwW18NQWBdH/yDWKmjp2LAmajYIU2bWvRq8f6vdgXSSvWB05trl9RGw0s7+DaiNbPAtrbg2tnD6FlTP6jYbaaBSM8eyX2wZNkhjRjzRLTuvIYn+cIUdXm6FFo6jNRZkrahLizP8JT2yWqijex34pWalU2GL4a4i4oiLlv1LkIeX/eqElRetPbDEBjqQJn4+VPK5Uq+3AULq/R4bZr3to82Zkg2dhTdyvoCAYjsZqFOsWhRkG43LJHrvVjaLttNG63CsEZ6wIRCZs2rB1p9V0r0ejDouYt4TRy8PpjBZalMpfJi9fhEQKgCBN1mZvxvFY9XZsMWVbkDFTDO+lDM1KUo68L3tyeNNStTixxRjTwUWr1TpZmEZ2OlZisLvoZ8bDurf3YXGs/VlYc6vDnEQkVkVPYZriKYrieRqndHWkLem30QxrekbJCUkMqkiomcKkkeIxrUBDE5CSZRonm2GDcbCKkoH6Sp84Sj1F7h6uoajkWhuSKCpG0IyI31X6HOIKOi4a0OzcaX3FueM4SUKS0nD2LqlKQwxjFRgaPhn1pG44e3E8bAgrHLHh0u0rsBuJ83bu7UgqMU2noxK6uUeobZy7X8twkhSe3abT/v9mYyXT1K8e1v3a+njr87BmH4eDawRWTkjRVFh0suefmWiPtPGY9S8fJsuM1EsOG8GwmqnhYqoesg4HK/hB+0ulYouNCk1VZdTQK9UKpSCx/kUo/ddQv1huMxLNSrVasaRCiuYrsih8ASfcJxuzcGb9Ci+Any2Bd26SzejGEKtRZhxfXxAEgCZDj5QphrA6RywT8OCrq2a5UkD1KjhhIQk7wn2DwVRSFw3SsaL5FyFMNc8hsZu/uFjiuHx6oXPRuiDJio1Wt9t1P87GCjB3XKwu4BdifZyBVWGpMfGO4TnEmbEmmlJDWPnmSJul8eFlHHKdDlY1xes9m2ZUo1nGgiqWGLlZx2WJs3GZ1/sqy1ukWUFKtdzUdLZnaGXaVME19IgdlXo2nyyiPuZ1QaCBX5/FQlFmZC7AWoCdu8eDy19nLUEop5pDrIYFR5QxWHIvRdk2T2HAChs0qlRPk1nTKOrYVjiT0ZsC7TuAEFaSQVoaODW4DY67aJH7tpse+FlgcenEaZmBdXv5iOT0AevHiNbnYV2dZa2G7tojTlUqSdehUjTvtmmMb6UYe1ZLO97Nw0qV+VATeN6RTXl66MhcrMlyH3Ey20SGBXaiYAquSwnCGxtb4AJVljSDG0RFEy6pwNqkm4ocrMUUZRAfb4kFjOGusxkZqSbcOAqsCrA2MG74h1QZBgLoIkNJAVaFKYNnL7GKocNJkBHDxaqaMKIWiTnLKQUZKQp20mPrk9ZqoJY3pqbz0HK+BESXRK57Meh0TvJdDnVPZmNdPFredrF+rZ29DGviYFgPmMSqucYKd2mjofQ8xhVnhJN4lzIu2z0wIw+/EMLqNAl1OvDUznLJuzvYYfjhYq1AMMrZKQ1JerKPmrBx3dZZE1w9cZ1qqgSY6+SC95sQeWEbiQHWOmvCJn0eFwqYhwGzB1iRpNkWpkNY+yGsTVZGjltWA6w9rNv1us4KBczAPiTfWlFBg8AP112sKkvJ9XoJ6+I41gEyhgvnXL6TXlgCuG78BGPryRIntmZj3dnbd7Gu7+1PND5rgvOj3b6eipUr0S4s92T6lrMIX45cGJcdLZNZoai6yHliNT5WWobABpooz/tiZ9noYSq80+lY5VJJlnuinXSwJn2sKs1Ypj2GldxOhRGsfZ3VbROHsEqUGwJLmmb0XKz6CFb3iE0Pa9l3whSjmyYzxFoiW9UjsHaDADh9Qcqw6Q7X7QzXpU/OUXdYmZvEmvmKPt982Nu9udlcnqD6vHTEt1BWeAKrwdM8eNJgTueidC6O556x7LUprhEm1ZC1etMUzV3ky+6mouz0pIdB0yTWAvhHi2xriNwYVk4mYXQz5WFFBGuPLZFNmLIxxGomYYbVYENYOdn9Jr0qZRSZMuyuT+N+gFVjSu4RpTK5cVXPCXOwIxE28LAWkrpEZuv+JQk5YfF8Yl6THynwpBfyS52gNBeB9Wdtz1Vt52VYYdo6rKVPYO3rumVZepArKDIB1obrnmnfrYl1zNM0T5ykhxWbnjlKOj8SJLl7oeVgcJ3AmlIMqcxokqozyjhWsZTSRJjbEKxYMxxr7VNsr69aKYGETA7WOrJTgiHJYWtFKsayogqYJcdgzEaDRFQB1gJ8MXJElURFWlGnPaw2K4gFmTjhEtOTOAubUl9mzAms6a44GMc6rvTGIJ3npmFd3N73tf0irGCsoZrspBOWDFCQQTLsobVqHpvA5IrkDrB0Mv3xJjg+RsPx3XwwsDVS41ipCmD9YhGsVQiZSikYKzUmVcZgI5z9xcFahWYkQ7OQ5EuUlYIQt8SytjPB4TQmiRnWklA/SRyoABOkYhKXyhYYMMemPKychlmWSaUEkXiXFIYjFJCIwcMoX+CmaTJsGadsDvwvm6yUdIIVjles0LCjFBy+nmRkUS0nKT5Z8jOWAbAODKRLT9XU0xvGxaXHNQLr4kdfZy/Bmrtqhx+QmJETFqW+0rRcb+pgNfHYNIUTXSEfK6v4fd0R2vfJ4MfGsKKi1oART4G+KnyCmEiAQzQE24RVnLMKmknKT4HPomabKhkfYZ1QhGYCrdGzzSLs0CDrUUNTEKfYtiIVtQLStCB52ejJsqk4l7XQtG3S4KQgCxqs5Lwjwl6UptLXIVYmx+aKtk2OJ5HjwXzV6Ricu8/rxEBG/smaOpn6nHiPSERZ67KvyWnrM8ropwfoLmy70clDVRNkq4wZf25CsHoDJKtG9XCxpsawlv0bXJrA+kxNZqbn34zjZrU7q0StqRJzpqadYLijh2tgoO7g6edfyATnvNNxXFyUtW4HeoG1wpy1/eOJpyOknkUygTQ/TCYQrIaLim1M9vjzWP+wOPMLZQrlijDP7ePi6pwHc9YnsaL8ZZf0jLLWHV8ffh1r7hah8DMvUVhVnvGnnTztmauD1fp3sSKxZ9F0qTmlKDUql9YFOp8Dqod16XKJ9IzCuuvr869izd3fovbYk4cTWFU/l0CDxVqCgP8MVkMiiij7/arEfn/mzriGojRm3FaiYcwF1cfaejpamgfry51wLnc38bzp5Ly17NknWxKKcBmGExwf6+8ZW2VMbpuy+dvst8BWZ9W/CzKbTLJW5D0JzNViZGejWJw8QZ+WOMfI6mG9WHB2E2Wte97ENaKAMxdW8qOW7bXs2MpxrH7at+d9nRBWb2xVor7/L2AtyyULp+q/y14lObos7qpfZsq2qeNU5E0J5/vfZF0VkQg+NYnb49Uixbj5QqbuQt7pGWWtZzdnjm4mc4dzYM3lDtvoYJzqBFbODXeHNe4hVs52k0zDpxpUp3YuKOhXsDK2KBpNzBeQYXAGKZcajYbrlLkCfIC1botIHrBoSBxJ9IikCXF9x5s6rX0R+pFyPkeKpaIhim4j6SRxou/l65gHHy3JbpFVch/XIMeQnM6SnNJCDe4HMv+h+cbEfecDawGvjXmwGp0TcSrWTGZxfX0n/LrGM7BmH1YRWj2daBzHapTdInhw/UPJQxddKB3h1c6HWaZnYSVJmwJPMrR0Ua8YYo+tVjFJGxj1SpXXkmVJLLFaqVrgbPZLlbU5pCRLAinImtUK3yC1np5VrdRVqlqxDVSgWAmZyV4dGt2zrVQEueLVXVn3blTr4PWlerJaLcONK1WsZgr2YBg8TTE8Mkxo0OE7GHLlvy9YQGqVoirhZ2BGsKbJ+3BPxk2ANX/ppYWjsIJ2j44mqzdzYM0lvrXRyuG4qSYmnxOW3OStFWSZPOslF0p1kodBXg4cm5sTbvwiVjCDIqYLgJWmLMNMlUk1FJyyzfBmHdO6BDNlnrYkraprPb1SRAqDZcGisdUrkVSvjCnTpDFjC3yqCVjBX5oYy9DIGEip0HWTor1IAE49GFUNC8IGmyYpyyTNCybFNsWmhesaslNWz8QQE/YqsqKV/1Mkk+KFCbcdZCDSCyLKP51lQkba9cGjr8aNWmykhljbUf53DWKlu6sIqhPW6mL1U/RB0cZN9bsY6ZI73Ih113r1YZbpWWMrRNmmzsiiUcZy3+hTWAF75NmCgcGyRAETrLjUMMSmrCCnVqcyZYlU+RtIJdl3mRE4roTrHGczdVQoMwSrZaAGxfa5Ojh5TsFeFV1hg1OBz+D4uR6jc1ISF2HKytaRKCcVsgcVcXVWEOupHscpPRUVaH5ybA1emCOTnCcHV4J0MHDNJCIqmqXQOzjoasxcc9lrgLpyHP165PhPD3jovLFV7DHDdERQpsG6QkY12SPeHDY9CyuuVqsVoGOQxDspB5FqXympNFKkYNKvEKwp57iFoiDzDMFqcaiRBHJSRS8gmdRv6ww4yWbKx0rKdYae6sN/CvkUWOsQq+nUw/tUxZDA0UOQmPKwqmC7vZ7MlEShwvBOmjES61KArDvHa1ZpcMAnHtbNiEnMdI38C1aPI/hyCWKpK58S0UNubvz3mjgPFm02+mpP9+rfftXSm/zQmC5TXqKCLoWejngWVllVVacaWyYVgSIuk0qtnCy6WCUHa5LsUEsxJaHEOlhFMNQhVi0Sq+RgJfVCseRFvn0WO6cmFRWwY2dULyclwFpwOztHUjAlE5ki1yzhJEsMOAqr6L+13DHmKeCgobVO9cKRVLfD76O3rwNnm8slvt+Rn/2O9L/OFhMvzBU9+8Q0jxma4r1HINzw1yujEjft/6XDzzI9O2QicrGqGBOYQKPAkuejlKSP1bCYosiZyWdhFcltgCR/ls1RmMykOKFSgtCsxJHjMcYY1gaPJYjOJQiPJamgwI0nRmJF516hvGM8HTCdwFcWLze8nrWbublmFkd/wnTlyvG3uezW1acVAvVh2uvpuYjUoWgF6Bx/23Qyw14hleslRx46o+ikB/LFWA2dsQuSjXmDsxhLVXQ6wArRMmpYEdaaGsFKsYaPle2jXqpcVGV/bEVNljUbDQGTR9oYRpP6FgzHYayppgixVNOQ6uWmwVQ1joP1XAHzakTuydhwn/k+N574CYlOnvReugwK6bXP25m5tHg2/q/Ntb9dJbK5q0PyA7MHh/fZKcqdrkX9JkjBCp4u5JlSwaCcyinvXZ4iFaLOs5YfJkZi5akZWCu2f41oJ5ZWyzBdShJDbZSTyaRMQqZSVSGhWZKyeL0iQHQL4Zn6RQesX2DXpapG9iOQhx9kVCBPKdtVgpWqNuD2ZJMVyx9b4YZMsQxmU6Q2rDGk7mpJsBeaYIXOop1kyqQgS+MkNGhJVtcZcOBwSyUnJjhkd+etPGipdZGfpZbzELF4shBKlCzvfJhDX6P+IdeVu9VV9zVz+DBVB9E/HCHVSUGOxpgpk1STDJ9hSfecUd+kGUxWYQbafQ/FCQzZyrddwOpsMsRacXYSwqoJflpH7AnObiRBLrnP/kuaqTRgbOU0Z9kwS3JDFZpiX2hysFlTRIYAp6YJZEwm2RAVdmb0BMNdMpwdGorZ7JeCrBKn1i29rpLLzDVghyQgcvbidIa92ib5crLcJAVZ1SyVTOdmM+sKmipxYXA+uiYq0ZW/zE/fxSuqr9mybPcU5xzdnDxJ4XiSlKZNAotm+C0Ob6vAYY114rzleY4uasUCGVutl6SLOYWU2gsUE0oCcxP5ohfrfEDe1RgeobUwWBp32q2Fzpw1hD8ujpt5Dbgn2l927FJFF8xypPObX9oXbAtW6k+XAo3WScetziDnhY0OBEkjYLlWutP9s+fwTiTZdDLFz1f7nCquByM0bc/lH14m7uLywuA4o5tPp/Oi2OpcLlwseXeTuDS4HPfT/38Fk4yX+y1Rkl6nas/lFxYGA5j0XHTJaYtLECd3TvKtVn6j48XCsd6huPP8yWCjdQ4OubNxTipDSxeDDsxrB4HZxnq3al0O8vlO2htJOVH8Y+FHrNcRAWgsXIC/PV/YiGn+G4JweGMJnbsR8cYgHkz/CRmdhZNBOm8MBl3RWPpLcg+xXiCOvNKQX1jixHz6vAsBcYc8FR7rXYtrwaymJW4MYDTtggs2WuTXBt76rGL9us5bS+foPL3RukgvLaUvuq1BJ7bSd69uJ53uGN3L/HnrsoUu0unLztLTvWL95covtPLpFndxeXm5QV7a657HvvcfULfjvFvFncc8/yl1W604gx8rVqxYsWL9Hv0fkZOmWUfV+xMAAAAASUVORK5CYII=" />
                </CardMedia>
                <CardTitle
                    title="XJTU ACM/ICPC Personal Registration"
                    subtitle="Fill the form below to regist yourself"
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