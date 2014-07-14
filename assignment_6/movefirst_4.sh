#/bin/bash
var=$(cd /home/webonise/assignment/ | ls -R   | head -5)
for i in $var;
do
mv $i /home/webonise/assignment/public_html/
done
echo $var
