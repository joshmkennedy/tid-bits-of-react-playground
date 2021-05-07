---
title: Add style if shortcode is in the content
date: '2021-05-07T14:38:11.045Z'
tags: ['wp', 'shortcodes', 'snippet']
---

Add styles for your shortcode only if the shortcode is in the content.

```php
<?php
add_action('wp_enqueue_scripts', 'shortcode_enqueue_assets');
function shortcode_enqueue_assets(){

  global $post;
  if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'shortcode_name') ) {

    wp_enqueue_script('short-code-scripts', THEME_URL . 'public/bundle.js',array(), '1.00', false);
    wp_enqueue_style('short-code-styles', THEME_URL . 'public/bundle.css',array(),'1.00', 'all');
  }
}
```
