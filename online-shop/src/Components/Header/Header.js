import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
  logout
} from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import Auth from "../../Auth";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
localStorage.setItem('login_status', 'Login');
localStorage.setItem('db_email', '');
localStorage.setItem('reg_status', "Register")


const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};

// Option items for product categories.
const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});

class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilterValue: categories[0].name
  };

  render() {
    let { anchorEl } = this.state;

    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#FAFAFB", padding: 10 }}
      >
        <Toolbar>
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton>

            <img
              src={cartImage}
              alt={"Logo"}
              style={{ marginLeft: 10 }}

            />
            <TextField
              label="Search products"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
            />

            <Select
              style={{ maxWidth: 200, marginLeft: 20 }}
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >
              {categoryOptions}
            </Select>

            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                  this.state.categoryFilterValue +
                  "&term=" +
                  this.state.searchTerm
                );
              }}
            >
              {" "}
              Search
            </Button>
                

                </div>




          <div className="right-part">
            {localStorage.getItem('login_status')==='Login' ? (
              <Button
                variant="outlined"
                style={{ marginRight: 30 }}
                color="primary"
                            onClick={() => {
                                localStorage.setItem('login_status', 'Login');

                  this.props.history.push("/login");
                }}
              >
                          Login
                        </Button>


                    ) : (
                            <div>
                <Avatar
                  onClick={event => {
                                        localStorage.setItem('login_status', 'Login');

                                        this.props.history.push("/login");
                  }}
                  style={{ backgroundColor: "#3f51b5", marginRight: 10 }}
                >
                                    <Person />
                                    
                            </Avatar>
                                <div class="user"> {localStorage.getItem('db_email')}
</div> 
                                </div>

                        )}
                    {localStorage.getItem('reg_status') === 'Register' ? (
                            <Button
                                variant="outlined"
                                style={{ marginRight: 60 }}
                                color="primary"
                                onClick={() => {


                                    this.props.history.push("/register");
                                }}
                            >
                                {localStorage.getItem('reg_status')}
                            </Button>


                        ) : (
                                <Button
                                    variant="outlined"
                                    style={{ marginRight: 60 }}
                                    color="primary"
                                    onClick={() => {
                                        localStorage.setItem('login_status', localStorage.getItem('db_email'));
                                        localStorage.setItem('reg_status', 'Register');
                                        localStorage.setItem('login_status', 'Login');

                                        this.props.history.push("/");
                                    }}
                                >
                                    {localStorage.getItem('reg_status')}
                                </Button>

                            )}
            <IconButton
              aria-label="Cart"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Checkout page
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signout(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
