#!/bin/bash
cd content/brain
mkdir $1 
cd $1

touch index.mdx

echo '---' >> index.mdx
echo 'title: ' $1 >> index.mdx
echo 'date: ' $(date) >> index.mdx
echo 'category:  Brain Dump' >> index.mdx
echo 'tags: ' >> index.mdx
echo '---' >> index.mdx
echo '' >> index.mdx
echo 'A new Brain dump. Write anything you want to find later, and reference.' >> index.mdx

