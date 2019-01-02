import React from 'react';
import { Helmet } from "react-helmet";

export default ({ title, description,schema } ) => (
    <Helmet>
        <title>{title}</title>
        <meta name="keywords" content="culture france patrimoine musées données" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content="Platforme du patrimoine culturel Français" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{schema}</script>
    </Helmet>
);