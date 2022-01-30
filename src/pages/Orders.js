import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import OrdersList from '../components/OrdersList';

function Orders() {
    return <Layout>
        <OrdersList />
    </Layout>;
}

export default Orders;
