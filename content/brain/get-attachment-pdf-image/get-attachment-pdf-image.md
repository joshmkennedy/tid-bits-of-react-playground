---
title: Get Attachment Pdf Image
date: '2022-01-31T12:05:21.263Z'
tags: []
---

In Wordpress you can get the pdf or really any attachment image by using the code below:

```php
<?php

$image_id = get_image_from_url($pdf);
$image = get_image_by_id($image_id);

function get_image_from_url($pdf_url){
	if( $id = attachment_url_to_postid( $pdf_url ) ){
		return $id;
	};
}

function get_image_by_id($id){
	if($markup = wp_get_attachment_image($id , 'full')){
		return $markup;
	}
}
```
