from django.shortcuts import render
import json
import paramiko
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.db.models import Q
# Create your views here.
from django.template import loader,Context
from django.http import HttpResponse
from django.http import JsonResponse
from osapp.models import BlogPost,User,Env,Tom,Config
import os
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import NameForm
from django.views.generic.edit import FormView
from django.template.context_processors import request

@csrf_exempt  
def index(request):
    return render(request,"index.html")
#    return HttpResponseRedirect('/static/html/index.html')

def archive(request):
    posts = BlogPost.objects.all()
    t = loader.get_template('archive.html')
    c = Context({'posts': posts})
    return HttpResponse(t.render(c))

def test(request):
#     response = ""
#     response1 = ""
#     env_list=Env.objects.all()
#     for var in env_list:
#             response1 += var.env_name + " "
#     response = response1
#     return HttpResponse("<p>" + response + "</p>")
#    return HttpResponse(env_list)
    return render(request, "test.html")

@csrf_exempt
def add(request):
#    if request.method =='POST':
        ret={'status':1001,'error':''}
#        name=request.POST.get('username')
#        pwd=request.POST.get('password')
        name=request.POST.get('name')
        pwd=request.POST.get('domain')
        user=User(your_name=name,your_age=pwd)
        user.save()
        print (name,pwd)
        if name == 'freeman' and pwd == 'redhat':
            ret['status'] = 1002
        else:
            ret['error']='Username oR password error'
        return  HttpResponse(json.dumps(ret))
#    return render(request,'test.html')

def get_name(request):
    if request.method == 'POST':
        form = NameForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/user/')
    else:
        form = NameForm()
    return render(request, 'name.html',{'form': form})

def get_user(request):
    object_list = User.objects.all()
    return render(request, 'user.html',{'object_list': object_list})

@csrf_exempt
def env_add(request):
    ret={"content":"","status":False}
    sid=request.POST.get('sid')
    name=request.POST.get('name')
    domain=request.POST.get('domain')   
    env=Env(env_name=name,env_domain=domain,env_sid=sid)
    env.save()
    ret={'status':1001,'error':''}
    return  HttpResponse(json.dumps(ret))

@csrf_exempt
def env_edit(request):
    ret={"content":"","status":False}
    sid=request.POST.get('sid')  
    env=Env.objects.get(env_sid=sid)
    env.env_name=request.POST.get('name')
    env.env_domain=request.POST.get('domain') 
    env.save()
    ret={'status':1001,'error':''}
    return  HttpResponse(json.dumps(ret))

@csrf_exempt
def env_del(request):
    cheungssh_info={"content":"","status":False}
    hosts=request.GET.get("hosts")
    e=Env.objects.get(env_sid=hosts)
    e.delete()
    return JsonResponse(cheungssh_info)

@csrf_exempt
def env_list(request):
    env_all=Env.objects.all()
    env_list={"content":[],"status":True}
    for e in env_all:
        name=e.env_name
        domain=e.env_domain
        sid=e.env_sid
        data={'env_name':name,'env_domain':domain,'env_sid':sid}
        env_list["content"].append(data)
    return JsonResponse(env_list)

def env_html(request):
#    return render(request, "env.html")
#    object_list = Env.objects.all()
    return render(request, 'env.html')

@csrf_exempt
def tom_add(request):
    ret={"content":"","status":False}
    tom_sid=request.POST.get('tom_sid')
    tom_name=request.POST.get('tom_name')
    tom_ma=request.POST.get('tom_ma')   
    tom=Tom(tom_sid=tom_sid,tom_name=tom_name,tom_ma=tom_ma)
    tom.save()
    ret={'status':1001,'error':''}
    return  HttpResponse(json.dumps(ret))

@csrf_exempt
def tom_edit(request):
    sid=request.POST.get('sid')  
    tom=Tom.objects.get(tom_sid=sid)
    tom_name=tom.tom_name
    tom_ma=tom.tom_ma
    data={'tom_name':tom_name,'tom_ma':tom_ma}
    return JsonResponse(data)

@csrf_exempt
def con_list(request):
    sid=request.POST.get('sid')  
    envs=Config.objects.only('con_env').filter(con_sid=sid).order_by('con_env')
    con_list={"content":[],"status":True}
    t_list={"content":[],"status":True}
    n_env=''
    l_env=''
    for e in envs:
        n_env=e.con_env
        if n_env == l_env :
            continue
        t_env=e.con_env
        t_data={'env':t_env}
        t_list["content"].append(t_data)
        srv_list={"content":[],"status":True}
        con_env = e.con_env
        srvs = Config.objects.filter(Q(con_env=con_env),Q(con_sid=sid))
        for s in srvs:
            con_sid = s.con_sid
            con_dir = s.con_dir
            con_srv = s.con_srv
            con_usr = s.con_usr
            con_pwd = s.con_pwd
            srv_sid = s.srv_sid
            srv={'con_sid':con_sid,'srv_sid':srv_sid,'con_env':con_env,'con_dir':con_dir,'con_srv':con_srv,'con_usr':con_usr,'con_pwd':con_pwd}
            srv_list["content"].append(srv)
        con_list["content"].append(srv_list)
        l_env=n_env
    return JsonResponse(con_list)

@csrf_exempt
def tom_save(request):
    ret={'success':True}
    con_sid=request.POST.get('con_sid')
    con_env=request.POST.get('con_env')
    con_dir=request.POST.get('con_dir')
    con_srv=request.POST.get('con_srv')
    con_usr=request.POST.get('con_usr')
    con_pwd=request.POST.get('con_pwd')
    srv_sid=request.POST.get('srv_sid')
    con=Config(con_sid=con_sid,srv_sid=srv_sid,con_env=con_env,con_dir=con_dir,con_srv=con_srv,con_usr=con_usr,con_pwd=con_pwd)
    c=Config.objects.filter(Q(con_env=con_env),Q(con_sid=con_sid),Q(con_srv=con_srv),Q(con_dir=con_dir))
    l=len(c)
#    chk_sid = c.con_sid
    if l == 1 :
        con = Config.objects.get(Q(con_env=con_env),Q(con_sid=con_sid),Q(con_srv=con_srv),Q(con_dir=con_dir))
        con.con_sid=request.POST.get('con_sid')
        con.con_env=request.POST.get('con_env')
        con.con_dir=request.POST.get('con_dir')
        con.con_srv=request.POST.get('con_srv')
        con.con_usr=request.POST.get('con_usr')
        con.con_pwd=request.POST.get('con_pwd')
        con.srv_sid=request.POST.get('srv_sid')
        con.save()
    else:
        con.save()
    return JsonResponse(ret)

@csrf_exempt
def tom_del(request):
    cheungssh_info={"content":"","status":False}
    sid=request.GET.get("sid")
    t=Tom.objects.get(tom_sid=sid)
    t.delete()
    return JsonResponse(cheungssh_info)    

@csrf_exempt
def con_del(request):
    ret = {"content":"","status":False}
    con_env = request.POST.get('con_env')
    con_sid = request.POST.get('con_sid')
    con = Config.objects.filter(Q(con_env=con_env),Q(con_sid=con_sid))
    for c in con:
        c.delete()
#     
#     l = len(con)
#     if l > 0 :
#         c = Config.objects.fil(Q(con_env=con_env),Q(con_sid=con_sid))
#         c.delete()
    return JsonResponse(ret)

@csrf_exempt
def tom_list(request):
    tom_all=Tom.objects.all()
    tom_list={"content":[],"status":True}
    for t in tom_all:
        name=t.tom_name
        ma=t.tom_ma
        sid=t.tom_sid
        data={'tom_name':name,'tom_ma':ma,'tom_sid':sid}
        tom_list["content"].append(data)
    return JsonResponse(tom_list)

@csrf_exempt
def upload_file(request):
#    ret = {"status":True}
    if request.method == "POST": 
        myFile =request.FILES.get("filename")  
        if not myFile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join("D:\Program Files\Python Dev\eclipse\eclipse-workspace\yunwei\upload",myFile.name),'wb+') 
        for chunk in myFile.chunks(): 
            destination.write(chunk)
        destination.close()
        return HttpResponse('ok')
#    return JsonResponse(ret)

@csrf_exempt    
def upload_ajax(request):
    if request.method == 'POST':
        user = request.POST.get('user')
        img = request.FILES.get('img')
        destination = open(os.path.join("D:\Program Files\Python Dev\eclipse\eclipse-workspace\upload",img.name),'wb+') 
        for chunk in img.chunks(): 
            destination.write(chunk)
        destination.close()
        return HttpResponse('ok')

@csrf_exempt  
def dep_env(request):
    sid = request.POST.get('sid')
    con_env_list=Config.objects.filter(con_sid=sid).order_by('con_env')
    env_list={"content":[],"status":True}
    l_env=''
    n_env=''
    for e in con_env_list:
        n_env=e.con_env
        if n_env == l_env:
            continue
        l_env=n_env
        env=e.con_env
        data={'con_env':env}
        env_list["content"].append(data)
    return JsonResponse(env_list)

@csrf_exempt 
def dep_app(request):
    path = 'D:\Program Files\Python Dev\eclipse\eclipse-workspace\upload'
    dirs = os.listdir(path)
    app_list={"content":[],"status":True}
    for d in dirs:
        data={'dep_app':d}
        app_list["content"].append(data)
    return JsonResponse(app_list)

@csrf_exempt 
def dep_app_to_server(request):
    sid=request.POST.get("sid")
    app=request.POST.get("app")
    env=request.POST.get("env")
    srv=request.POST.get("con_srv")
    con_dir=request.POST.get("con_dir")
    f='D:\Program Files\Python Dev\eclipse\eclipse-workspace\upload\%s' %app
    c=Config.objects.get(Q(con_env=env),Q(con_sid=sid),Q(con_srv=srv),Q(con_dir=con_dir))
    usr=c.con_usr
    pwd=c.con_pwd
    tmp='/tmp/%s' %app
    dep_dir=con_dir+'/webapps/'+app.split('.')[0]
    dep_bin=con_dir+'/bin'
    cmd="""
        source ~/.bash_profile
        mkdir -p %s
        cd %s
        jar -xvf %s
        ps -ef | grep java | grep %s | grep -v grep | awk '{print $2}' | xargs kill -9
        sh %s/startup.sh
    """ %(dep_dir,dep_dir,tmp,dep_bin,dep_bin)
    s=paramiko.SSHClient()
    s.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    s.connect(srv,22,usr,pwd)
    sftp=s.open_sftp()
    sftp.put(f,tmp)
    stdin,stdout,stderr=s.exec_command(cmd)
    ret={"status":stdout.read(),"error":stderr.read()}
 
    s.close()

    return JsonResponse(ret)

@csrf_exempt 
def del_con_server(request):
    ret={"ret":True}
    con_sid=request.POST.get("con_sid")
    con_srv=request.POST.get("con_srv")
    con_dir=request.POST.get("con_dir")
    con_env=request.POST.get("con_env")
    srv=Config.objects.get(Q(con_sid=con_sid),Q(con_srv=con_srv),Q(con_dir=con_dir),Q(con_env=con_env))
    srv.delete()
    return JsonResponse(ret)

@csrf_exempt
def edit_con_srv(request):
    ret={"ret":True}
    srv_sid=request.POST.get("srv_sid")
    srv=Config.objects.get(srv_sid=srv_sid)
    srv.con_srv=request.POST.get("con_srv")
    srv.con_dir=request.POST.get("con_dir")
    srv.con_usr=request.POST.get("con_usr")
    srv.con_pwd=request.POST.get("con_pwd")
    srv.save()
    return JsonResponse(ret)
    
@csrf_exempt
def app_save(request):
    ret={"ret":True}
    tom_sid=request.POST.get("tom_sid")
    tom=Tom.objects.get(tom_sid=tom_sid)
    tom.tom_name=request.POST.get("tom_name")
    tom.tom_ma=request.POST.get("tom_ma")
    tom.save()
    return JsonResponse(ret) 
    
@csrf_exempt
def get_dep_srv(request):
    ret={"content":[]}
    con_sid=request.POST.get("con_sid")
    con_env=request.POST.get("con_env")
    srv_list=Config.objects.filter(Q(con_sid=con_sid),Q(con_env=con_env))
    for s in srv_list:
        con_srv=s.con_srv
        con_dir=s.con_dir
        srv={"con_srv":con_srv,"con_dir":con_dir}
        ret["content"].append(srv)
    return JsonResponse(ret)