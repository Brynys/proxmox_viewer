from django.shortcuts import render, redirect
from proxmoxer import ProxmoxAPI
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse

api_url = '192.168.5.51:8006'
api_user = 'Api-jj@pve'
api_password = '123456'

def get_vms(request):
    proxmox = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)
    

    vms = []
    for node in proxmox.nodes.get():
        for vm in proxmox.nodes(node['node']).qemu.get():
            vm['node'] = node['node']
            vms.append(vm)
    vms.sort(key=lambda x: x['vmid'])  

    containers = []
    for node in proxmox.nodes.get():
        for container in proxmox.nodes(node['node']).lxc.get():
            container['node'] = node['node']
            containers.append(container)
    containers.sort(key=lambda x: x['vmid'])  

    nodes = proxmox.nodes.get()

    context = {'nodes': nodes, 'vms': vms, 'containers': containers}
    return render(request, 'vm_viewer/table.html', context)

def toggle_vm(api, vmid, action, node):
    if action == 'start':
        api.nodes(node).qemu(vmid).status.start.post()
    elif action == 'stop':
        api.nodes(node).qemu(vmid).status.stop.post()

def toggle_vm_view(request, vmid, action, node):
    api = ProxmoxAPI(api_url, user=api_user, password=api_password, verify_ssl=False)
    toggle_vm(api, vmid, action, node)
    return redirect('get_vms')

def get_containers(api):
    containers = []
    for node in api.nodes.get():
        node_containers = api.nodes(node['node']).lxc.get()
        containers.extend(node_containers)
    return containers

def table(request):
    return render(request, 'vm_viewer/table.html')

def bubles(request):
    return render(request, 'vm_viewer/bubles.html')