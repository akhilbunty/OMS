import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../services/services';
import swal from 'sweetalert';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  closeResult: string;
  addform: FormGroup;
  submitted = false;
  orders;
  addflag: Boolean;
  modeltitle;
  toeditid;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private service: Service
  ) { }

  ngOnInit() {
    this.getOrders();
    this.addform = this.formBuilder.group({
      customername: ['', Validators.required],
      customerphone: ['', Validators.required],
      customeraddress: ['', Validators.required],
      ordertotal: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  open(content, id) {
    if (id == 1) {
      this.addflag = true;
      this.modeltitle = "New";
      this.addform.setValue({
        customername: '',
        customerphone: '',
        customeraddress: '',
        ordertotal: '',
        date: '',
      })
    } else {
      this.addflag = false;
      this.modeltitle = "Edit";
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  get f() { return this.addform.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addform.invalid) {
      return;
    } else {
      this.modalService.dismissAll();
      if (this.addflag) {
        this.addOrder(this.addform.value)
      } else { 
        let data = {
          customername: this.f.customername.value,
          customerphone: this.f.customerphone.value,
          customeraddress: this.f.customeraddress.value,
          ordertotal: this.f.ordertotal.value,
          date: this.f.date.value
        }
        data["_id"] = this.toeditid
        this.editOrder(data)
      }
    }
  }

  getOrders() {
    this.service.getOrders().subscribe(
      data => {
        this.orders = data['getorders'].ordersinfo;
      },
      error => {
      });
  }
  addOrder(data) {
    this.service.addOrder(data).subscribe(
      data => {
        this.orders.push(data['getorders'].ordersinfo);
      },
      error => {
      });
  }
  editOrder(data) {
    this.service.editOrder(data).subscribe(
      data => {
        let index = this.orders.findIndex(order => order._id === data['getorders'].ordersinfo._id);
        this.orders[index] = data['getorders'].ordersinfo;
      },
      error => {
      });
  }


  onEdit(order) {
    this.addform.setValue({
      customername: order.customer_buyer_name,
      customerphone: order.customer_phone,
      customeraddress: order.customer_address,
      ordertotal: order.order_total,
      date: new Date(order.order_due_date).toISOString().split("T")[0],
    });
    this.toeditid = order._id;
  }
  onDelete(id) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.service.deleteOrder(id).subscribe(
            data => {
              swal("Deleted!", "Your imaginary file has been deleted!", "success");
              this.orders = this.orders.filter(order => order._id !== id);
            },
            error => {
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  }
}
