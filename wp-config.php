<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'cbmwgoop_wpnd' );

/** MySQL database username */
define( 'DB_USER', 'cbmwgoop_cbmwgoop' );

/** MySQL database password */
define( 'DB_PASSWORD', 'e81QZk87UjU+@z' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ikuiiwdv3lwiyjwxgchvljrkan72g4ekmefc3w5djjxenvsybljrfop4srrbtlya' );
define( 'SECURE_AUTH_KEY',  'npolssysludu2mo3xb5xadbwg4tdi3fghgqou8ftukyd1mzyopfpswlcgojtkwmk' );
define( 'LOGGED_IN_KEY',    'sfb2ehyyym7a5wac8umcm9wbfgd6yfwc4mpifowlsuoi3vozkdwt8okayd8ws4du' );
define( 'NONCE_KEY',        'ireqptbu0t90gnoxdqa37uqog9orrmebwivqbi444q2admfolcjygyxnyatif7vz' );
define( 'AUTH_SALT',        'h5htv3wwhs2r5rrblg1dpmurwcxt9vpi9hsmj9qm2nhv7vdgm8r4agvp6kzdmybk' );
define( 'SECURE_AUTH_SALT', 'ibs0br6g0zlusxiusabrgbbsrfyxtn4gtwr8ggdbtnwbq6ivnjodjozagb5iyu7y' );
define( 'LOGGED_IN_SALT',   'qj4pl9qfye0vuod8tbpmi2dowbxrwfzlw5oc8kyjco0ylc5crjkbjtuqcgbh5wl0' );
define( 'NONCE_SALT',       'veslkljmktxdnpfhdlaklvpvyjihbf7mqmwrsrby6lay4mazrmplbozjosn4fhdt' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpml_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
