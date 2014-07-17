/*Assignment to interpret the file to identify-
	-language in which it is written
	-class names
	-method names along with access specifier
	-variable names0
*/	
//declaration of header files
#include<iostream>
#include<stdio.h>
#include<fstream>
#include<string>
#include<cstring>
using namespace std;

//function declaration
int javaLanguage(char file_name[]);
int otherLanguage(char file_name[]);
void javaFile(char file_name[]);
char *className(char word[]);
void methodVariable(char word[]);
void phpFile(char file_name[]);
void rubyFile(char file_name[]);

int main()
{
	ifstream fin;
	char file_name[100], word[100], access_specifier[100], fname[100];
	int flag=0,length=0;
	//accept file from user
	cout<<"Enter the name of file: ";
	cin>>file_name;
	fin.open(file_name);
	//check if file exists
	if(fin.good())
	{
		cout<<"File exists"<<endl;
	}
	else
	{
		cout<<"File does not exists"<<endl;
	}
	//check whether given file is java
	flag=javaLanguage(file_name);
	fin.close();	
	if(flag==1)
	{
		cout<<"The given file is a Java file";		
	}
	//check whether file is php or ruby
	else
	{
		flag=otherLanguage(file_name);
	}
	fin.close();
	switch(flag)
	{	//read java file
		case 1: javaFile(file_name); 
			break;
		//read php_file
		case 2: phpFile(file_name);
			break;
		//read ruby
		case 3: rubyFile(file_name);
			break;
	}
return 0;
}
//if filename is same as classname then it is java file
int javaLanguage(char *file_name)
{
	ifstream fin;
	char *class_name, word[100], fname[100];
	int length=0;
	strcpy(fname,file_name);
	length=strlen(fname);	
	fin.open(file_name);
	while(fname[length]!='.')
	{
		length--;
	}
	fname[length]='\0';
	while(!fin.eof())
	{
		fin>>word;
		if(strcmp(word,"class")==0)
		{
			fin>>word;
			class_name=className(word);
			if(strcmp(class_name,fname)==0)
			{
				return 1;
			}		
		}

	}
}
	
//check if file is php or ruby        
int otherLanguage(char *file_name)
{
	ifstream fin;	
	char word[100];
	int flag=0;
	fin.open(file_name);
	while(!fin.eof())
	{
		fin>>word;
		if(strcmp(word,"<?php")==0)
		{
			cout<<"The given file is a Php File"<<endl;
			//flag 2 indicates case for php file 
			return 2;		
		}
		else if((strcmp(word,"def")==0 || strcmp(word,"end")==0) || strcmp(word,"@@")==0 )
		{
			cout<<"The given file is a Ruby File"<<endl;
			//flag 3 indicates case for ruby file 
			return 3;		
		}
	}
}
//read the java file
void javaFile(char *file_name)
{
	ifstream fin;
	char word[100], access_specifier[100], *class_name;
	fin.open(file_name);
	while(!fin.eof())
	{
		fin>>word;
		//found keyword public or private or protected
		if(strcmp(word,"public")==0 || strcmp(word,"private")==0 || strcmp(word,"protected")==0)
		{
			//copy the word to access_specifier array 				
			strcpy(access_specifier,word);
			fin>>word;
			//found a keyword class
			if(strcmp(word,"class")==0)
			{
				fin>>word;
				class_name=className(word);
				cout<<" Class: "<<word<<endl;		
			}
			else if(strcmp(word,"String")==0 || strcmp(word,"void")==0 || strcmp(word,"Long")==0 || strcmp(word,"Double")==0)	    
			{			    
				fin>>word;
				methodVariable(word);
				cout<<"  Access specifier:"<<access_specifier<<endl;

			}
		}
	     	else if(strcmp(word,"class")==0)
	     	{
			fin>>word;
			class_name=className(word);
			cout<<" Class: "<<word<<endl;
	     	}
	     	else if(strcmp(word,"String")==0 || strcmp(word,"Double")==0) //default access specifier
	     	{
			fin>>word;
			methodVariable(word);
			cout<<"  Access specifier:"<<"default"<<endl;
	     	}
	}
}
//fetches name of class
char *className(char *word)
{
	int length;
	length=strlen(word);
	if(word[length-1]=='{')
	{
		word[length-1]='\0';
	}
	return word;
}
//fetches method names and variable names
void methodVariable(char * word)
{
	int length;
	length=strlen(word);
	//word ending with ;  is variable
	if(word[length-1]==';') 
	{
		word[length-1]='\0';
		cout<<endl<<" Variable:  "<<word;
	}
	else         //parametised method
	{
		while(word[length-1]!='(')
		{
			length--;
		}
		word[length-1]='\0';
		cout<<endl<<"Method:  "<<word;
	}
}
//read the php file
void phpFile(char *file_name)
{
	ifstream fin;
	char word[100], access_specifier[100], *class_name;
	int length=0;
	fin.open(file_name);
	while(!fin.eof())
	{
		fin>>word;
		//found a keyword class
		if(strcmp(word,"class")==0)
		{
			fin>>word;
			//call class_name method to find name of class 
			class_name=className(word);
			cout<<" Class: "<<word<<endl;
		}
		//found keyword public or private or protected
		else if((strcmp(word,"public")==0) || (strcmp(word,"private")==0) || (strcmp(word,"protected")==0))
		{
			//copy the word to access_specifier array 				
			strcpy(access_specifier,word);
			fin>>word;
			//found a keyword function
			if(strcmp(word,"function")==0)
			{
				fin>>word;
				//call method_variable to find the method and variable names
				methodVariable(word);
				//print the stored access_specifier
				cout<<"  Access specifier:"<<access_specifier<<endl;
			}
			//found variable
			else
			{
				length=strlen(word);
				while(length>=0 && word[length-1]!='$')
				{
					length--;
				}
				if(word[length-1]=='$')
				{
					cout<<"Variable: "<<word<<"   Access specifier: "<<access_specifier;
				}

			}
		}
	}
}
//read ruby file
void rubyFile(char *file_name)
{
	ifstream fin;
	char word[100], access_specifier[100];
	int length=0;
	fin.open(file_name);
	while(!fin.eof())
	{
		fin>>word;
		//found a keyword class		
		if(strcmp(word,"class")==0)
		{
			fin>>word;
			//print the class name
			cout<<" Class: "<<word<<endl;
		}
		//found a keyword def
		else if(strcmp(word,"def")==0)
		{
			fin>>word;
			//find the name of method
			methodVariable(word);
		}
		//find a variable
		else
		{
			length=strlen(word);
			while(length>=0 && word[length-1]!='@')
			{
				length--;
			}
			if(word[length-1]=='@')
			{
				cout<<"Variable: "<<word<<" "<<endl;
			}
		}
	}
}



