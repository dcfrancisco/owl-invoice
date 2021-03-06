import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvoiceListPage from './pages/invoice-list-page';
import InvoiceCreatePage from './pages/invoice-create-page';
import InvoiceEditPage from './pages/invoice-edit-page';
import InvoiceClonePage from './pages/invoice-clone-page';

const InvoiceRoutes = () => (
    <Switch>
        <Route path="/invoices/" exact component={InvoiceListPage} />
        <Route path="/invoices/new" exact component={InvoiceCreatePage} />
        <Route path="/invoices/:id" exact component={InvoiceEditPage} />
        <Route path="/invoices/:id/clone" exact component={InvoiceClonePage} />
    </Switch>
);

export default InvoiceRoutes;