import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Logout from '../components/Logout';
import GuestRoute from './guestRoute';
import ProtectedRoute from './ProtectedRoute';

const SignUp = React.lazy(() => import('../components/register/register'));
const Footer = React.lazy(() => import('../components/layout/footer'));
const Header = React.lazy(() => import('../components/layout/header'));
const Login = React.lazy(() => import('../components/login/login'));
const NotFound = React.lazy(() => import('../components/common/NotFound'));
const Home = React.lazy(() => import('../components/home/Home'));
const Order = React.lazy(() => import('../components/order/Order'));
const loading = () => 'Loading...';

const MainRoutes = () => {
  const Layout = ({ children }) => (
    <>
      <Header />
      <Suspense fallback={<div className="suspenseLoader">Loading...</div>}>
        {children}
      </Suspense>
      <Footer />
    </>
  );

  return (
    <Suspense fallback={loading()}>
      <Layout>
        <Switch>
          <GuestRoute exact path="/" component={Login} />
          <GuestRoute exact path="/login" component={Login} />
          <GuestRoute exact path="/register" component={SignUp} />
          <ProtectedRoute exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/order" component={Order} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default MainRoutes;
