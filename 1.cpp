#include<iostream>
using namespace std;

int main()
{
    int a, b, c, d;
    int max1, max2;

    cout<<"Enter your 1st Integer :"<<endl;
    cin>>a;

    cout<<"Enter your 2nd Integer :"<<endl;
    cin>>b;

    cout<<"Enter your 3rd Integer :"<<endl;
    cin>>c;

    cout<<"Enter your 4th Integer :"<<endl;
    cin>>d;

    max1=a;
    max2=b;
    max1=max1>max2?max1:max2;
    max1 = (a>b && a>c && a>d)? a : (b>a && b>c && b>d)? b : (c>d && c>a && c>b)? c : d;

    max2= a==max1?(b>=c && b>=d)?b:(c>=b && c>=d)?c:d   :
    b==max1?(a>=c && a>=d)?a:(c>=a && c>=d)?c:d               :
    c==max1?(a>=b && a>=d)?a:(b>=a && b>=d)?b:d :
    d==max1? (a>=b && a>=c)?a:(b>=a && b>=c)?b:c : max2;




    cout<<"1st Max Number Is : "<<max1<<endl;
    cout<<"2nd Max Number Is : "<<max2<<endl;
    return 0;
}