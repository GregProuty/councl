aws --profile alkimiya s3 sync ./out s3://$1/ --exclude="*/*"
aws --profile alkimiya s3 --profile alkimiya sync ./out/_next s3://$1/_next \
  --delete --cache-control immutable,max-age=100000000,public
(cd out &&
  find . -type f -name '*.html' | while read HTMLFILE; do
    HTMLFILESHORT=${HTMLFILE:2}
    HTMLFILEBASE=${HTMLFILESHORT::${#HTMLFILESHORT}-5}

    aws --profile alkimiya s3 cp s3://$1/${HTMLFILESHORT} \
      s3://$1/$HTMLFILEBASE --content-type 'text/html'
  done)
