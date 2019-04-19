#include <stdio.h>

typedef long long NUM;

int main () {
	printf("hello world\n");
	NUM last = 0;
	for (NUM i=0;i<9999999999;){
		int cs[10] = { 
			(i/1000000000)%10,
			(i/100000000)%10,
			(i/10000000)%10,	
			(i/1000000)%10,	
			(i/100000)%10,	
			(i/10000)%10,	
			(i/1000)%10,	
			(i/100)%10,	
			(i/10)%10,	
			i%10
		};

		int j=0;
		while (cs[j]==0&&j<10){
			j++;
		}
		for (;j<10;j++){
			for (int k=j+1;k<10;k++){
				if (cs[j]==cs[k]){
					goto LOOP;
				}
			}
		}
		printf("%lld\n",i-last);
		last=i;
		
		LOOP: i++;
	}
}