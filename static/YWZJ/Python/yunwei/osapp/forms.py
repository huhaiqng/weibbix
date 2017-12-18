from django import forms
from models import User

class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)
    your_age = forms.CharField(label='Your age', max_length=100)
    
#     your_name = forms.CharField(
#         label=u'Your Name',
#         max_length=50,
#         widget=forms.TextInput(attrs={'class': '', 'placeholder': u'Your Name"'}),
#         )
#     your_age = forms.CharField(
#         label=u'Your Age',
#         max_length=50,
#         widget=forms.TextInput(attrs={'class': '', 'placeholder': u'Your Age"'}),
#         )
    
    def save(self):
        cd = self.cleaned_data
        your_name = cd['your_name']
        your_age = cd['your_age']
        user = User(
            your_name=your_name,
            your_age=your_age)
        user.save()